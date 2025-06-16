'use client'
import dynamic from 'next/dynamic'

// Import components that use browser APIs with ssr: false
export const ThreeDMarquee = dynamic(
  () => import('./components/3Dmarquee/3d-marquee').then(mod => mod.ThreeDMarquee),
  { ssr: false }
)

export const GridDistortion = dynamic(
  () => import('./components/GridDistortion/GridDistortion'),
  { ssr: false }
)

export const WeatherTime = dynamic(
  () => import('./components/weathertime/weathertime'),
  { ssr: false }
)

export const MacbookScroll = dynamic(
  () => import('./components/MacbookScroll/MacbookScroll').then(mod => mod.MacbookScroll),
  { ssr: false }
)

// Tambahkan CardSwap dan komponennya
export const CardSwap = dynamic(
  () => import('./components/CardSwap/CardSwap'),
  { ssr: false }
)

export const Card = dynamic(
  () => import('./components/CardSwap/CardSwap').then(mod => mod.Card),
  { ssr: false }
)

// Tambahkan komponen lain yang mungkin mengakses window
export const SplashCursor = dynamic(
  () => import('./components/SplashCursor/SplashCursor'),
  { ssr: false }
)

export const ScrollVelocity = dynamic(
  () => import('./components/ScrollVelocity/ScrollVelocity'),
  { ssr: false }
)

export const AudioPlayer = dynamic(
  () => import('./components/AudioPlayer/AudioPlayer').then(mod => mod.AudioPlayer),
  { ssr: false }
)

export const RollingGallery = dynamic(
  () => import('./components/RollingGallery/RollingGallery'),
  { ssr: false }
)

export const FloatingNav = dynamic(
  () => import('./components/floatingnavbar/floatingnavbar').then(mod => mod.FloatingNav),
  { ssr: false }
)

export const LampContainer = dynamic(
  () => import('./components/lamp/lamp').then(mod => mod.LampContainer),
  { ssr: false }
)

export const LampDemo = dynamic(
  () => import('./components/lamp/lamp').then(mod => mod.LampDemo),
  { ssr: false }
)

export const GoogleGeminiEffect = dynamic(
  () => import('./components/googleGemini/google-gemini-effect').then(mod => mod.GoogleGeminiEffect),
  { ssr: false }
)

export const Particles = dynamic(
  () => import('./components/Particles/Particles'),
  { ssr: false }
)

export const StickyScroll = dynamic(
  () => import('./components/stickyscroll/sticky-scroll-reveal').then(mod => mod.StickyScroll),
  { ssr: false }
)

export const BackgroundBoxes = dynamic(
  () => import('./components/BoxesCore/BoxesCore').then(mod => mod.BackgroundBoxes),
  { ssr: false }
)