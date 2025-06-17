"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

interface WeatherData {
  temp: number;
  description: string;
  city: string;
  icon: string;
  country?: string;
  humidity?: number;
  windSpeed?: number;
  lastUpdated: number; // Timestamp for cache validation
}

interface WeatherTimeProps {
  city?: string;
  country?: string;
  refreshInterval?: number; // in milliseconds
  showSeconds?: boolean;
  className?: string;
  onWeatherFetch?: (data: WeatherData | null) => void;
}

// Create a placeholder image BlurURL
const PLACEHOLDER_BLUR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

// Dynamic component with no SSR to avoid hydration issues with time
const WeatherTimeComponent: React.FC<WeatherTimeProps> = ({
  city = "Yogyakarta",
  country = "Indonesia",
  refreshInterval = 600000, // 10 minutes default
  showSeconds = true,
  className = "",
  onWeatherFetch
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Format functions
  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds ? { second: '2-digit' } : {}),
      hour12: false
    });
  }, [showSeconds]);

  const formatDate = useCallback((date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // Check and load cached weather data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cachedData = localStorage.getItem(`weather-${city}`);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData) as WeatherData;
          // Check if cache is still valid (less than 30 minutes old)
          if (Date.now() - parsedData.lastUpdated < 30 * 60 * 1000) {
            setWeather(parsedData);
            setLoading(false);
          }
        }
      } catch (err) {
        console.log("Error reading from cache:", err);
        // No action needed - will fetch fresh data
      }
    }
  }, [city]);

  // Time update effect - optimized to update less frequently for seconds
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    
    // Initial update
    updateTime();
    
    // Use different intervals based on showing seconds or not
    const interval = showSeconds ? 1000 : 30000; // 1s or 30s
    const timer = setInterval(updateTime, interval);
    
    return () => clearInterval(timer);
  }, [showSeconds]);

  // Weather fetch function
  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use environment variable safely
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      
      if (!API_KEY) {
        throw new Error("API key is missing");
      }
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`,
        { cache: 'no-store' }
      );
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const weatherData: WeatherData = {
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        lastUpdated: Date.now()
      };
      
      // Cache the data
      if (typeof window !== 'undefined') {
        localStorage.setItem(`weather-${city}`, JSON.stringify(weatherData));
      }
      
      setWeather(weatherData);
      if (onWeatherFetch) onWeatherFetch(weatherData);
      setRetryCount(0);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch weather data");
      
      // Only use fallback data after multiple retries or if we have no existing data
      if (retryCount > 2 || !weather) {
        // Fallback data with current timestamp
        const fallbackData: WeatherData = {
          temp: 28,
          description: "partly cloudy",
          city: city,
          country: country,
          icon: "02d",
          lastUpdated: Date.now()
        };
        setWeather(fallbackData);
        if (onWeatherFetch) onWeatherFetch(fallbackData);
      }
      
      setRetryCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  }, [city, country, retryCount, weather, onWeatherFetch]);

  // Initial fetch and refresh interval
  useEffect(() => {
    // Only fetch if we don't have cached data loaded
    if (loading) {
      fetchWeather();
    }
    
    // Set up refresh interval
    const weatherTimer = setInterval(fetchWeather, refreshInterval);
    
    return () => clearInterval(weatherTimer);
  }, [fetchWeather, refreshInterval, loading]);

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl min-w-[280px] ${className}`}
         role="region" 
         aria-label="Weather and time information"
         aria-live="polite">
      {/* Card Content */}
      <div className="text-white space-y-4" aria-busy={loading}>
        {/* Time Display */}
        <div className="text-center">
          <div className="text-3xl font-bold font-mono tracking-wider mb-1 text-shadow-lg" aria-label={`Current time: ${formatTime(currentTime)}`}>
            {formatTime(currentTime)}
          </div>
          <div className="text-sm opacity-80" aria-label={`Today's date: ${formatDate(currentTime)}`}>
            {formatDate(currentTime)}
          </div>
        </div>
        
        {/* Divider dengan animasi */}
        <div className="relative">
          <div className="border-t border-white/20"></div>
          <div className="absolute inset-0 border-t border-white/10 animate-pulse"></div>
        </div>
        
        {/* Weather Display */}
        {loading && !weather ? (
          <div className="animate-pulse space-y-3" role="status" aria-label="Loading weather information">
            <div className="h-4 bg-white/30 rounded w-24"></div>
            <div className="h-8 bg-white/30 rounded w-16"></div>
            <div className="h-3 bg-white/30 rounded w-20"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : error && !weather ? (
          <div className="bg-red-500/20 p-3 rounded-lg text-sm text-center" role="alert">
            <p>Unable to fetch current weather</p>
            <button 
              onClick={fetchWeather}
              className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs transition-colors"
              aria-label="Retry loading weather data"
            >
              Retry
            </button>
          </div>
        ) : weather && (
          <div className="flex items-center justify-between" aria-live="polite">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={`https://openweathermap.org/img/w/${weather.icon}.png`}
                  alt=""
                  width={48}
                  height={48}
                  className="drop-shadow-lg"
                  placeholder="blur"
                  blurDataURL={PLACEHOLDER_BLUR}
                  priority={false}
                />
                {/* Glow effect untuk icon */}
                <div className="absolute inset-0 w-12 h-12 bg-white/20 rounded-full blur-xl -z-10"></div>
              </div>
              <div>
                <div className="text-2xl font-bold" aria-label={`Temperature: ${weather.temp} degrees Celsius`}>
                  {weather.temp}°C
                </div>
                <div className="text-sm opacity-80 capitalize" aria-label={`Weather condition: ${weather.description}`}>
                  {weather.description}
                </div>
                
                {/* Additional weather info */}
                {weather.humidity && (
                  <div className="text-xs opacity-70 mt-1" aria-label={`Humidity: ${weather.humidity}%`}>
                    Humidity: {weather.humidity}%
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Location dengan icon */}
        <div className="flex items-center justify-center gap-2 text-sm opacity-70">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{weather?.city || city}, {weather?.country || country}</span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 text-xs opacity-60">
          <div 
            className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400' : error ? 'bg-red-400' : 'bg-green-400'} animate-pulse`}
            aria-hidden="true"
          ></div>
          {loading ? "Updating..." : error && !weather ? "Offline" : "Live Data"}
          {!loading && weather && (
            <span className="ml-1">
              ({Math.round((Date.now() - weather.lastUpdated) / 60000)}m ago)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Export as dynamic component to avoid SSR issues with time
const WeatherTime = dynamic(() => Promise.resolve(WeatherTimeComponent), {
  ssr: false,
  loading: () => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl min-w-[280px] max-w-[320px] animate-pulse">
      <div className="h-24 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20"></div>
      </div>
    </div>
  )
});

export default WeatherTime;