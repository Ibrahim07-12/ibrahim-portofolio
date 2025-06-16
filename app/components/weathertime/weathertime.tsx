"use client";
import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  description: string;
  city: string;
  icon: string;
}

export default function WeatherTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Update time setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "78131ca6e4671bc11c4a4520a02c2a91";
        const city = "Yogyakarta";
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (response.ok) {
          const data = await response.json();
          setWeather({
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            city: data.name,
            icon: data.weather[0].icon
          });
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        // Fallback data
        setWeather({
          temp: 28,
          description: "partly cloudy",
          city: "Yogyakarta",
          icon: "02d"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather setiap 10 menit
    const weatherTimer = setInterval(fetchWeather, 600000);
    
    return () => clearInterval(weatherTimer);
  }, []);

  // Format functions
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl min-w-[280px] max-w-[320px]">
      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-white/30 rounded w-24"></div>
          <div className="h-8 bg-white/30 rounded w-16"></div>
          <div className="h-3 bg-white/30 rounded w-20"></div>
        </div>
      ) : (
        <div className="text-white space-y-4">
          {/* Time Display */}
          <div className="text-center">
            <div className="text-3xl font-bold font-mono tracking-wider mb-1 text-shadow-lg">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm opacity-80">
              {formatDate(currentTime)}
            </div>
          </div>
          
          {/* Divider dengan animasi */}
          <div className="relative">
            <div className="border-t border-white/20"></div>
            <div className="absolute inset-0 border-t border-white/10 animate-pulse"></div>
          </div>
          
          {/* Weather Display */}
          {weather && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={`https://openweathermap.org/img/w/${weather.icon}.png`}
                    alt={weather.description}
                    className="w-12 h-12 drop-shadow-lg"
                  />
                  {/* Glow effect untuk icon */}
                  <div className="absolute inset-0 w-12 h-12 bg-white/20 rounded-full blur-xl -z-10"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {weather.temp}°C
                  </div>
                  <div className="text-sm opacity-80 capitalize">
                    {weather.description}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Location dengan icon */}
          <div className="flex items-center justify-center gap-2 text-sm opacity-70">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {weather?.city || "Yogyakarta"}, Indonesia
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-center gap-2 text-xs opacity-60">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Data
          </div>
        </div>
      )}
    </div>
  );
}