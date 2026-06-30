import { lazy, Suspense, useMemo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/PageLoader'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { BookingsProvider } from './context/BookingsContext'

// Route-level code splitting: each page is its own chunk, only fetched
// when the user actually navigates there.
const Home = lazy(() => import('./pages/Home'))
const Booking = lazy(() => import('./pages/Booking'))
const Scheduler = lazy(() => import('./pages/Scheduler'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Services = lazy(() => import('./pages/Services'))

function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-32 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-3 text-3xl font-semibold">This date isn't on the calendar.</h1>
      <p className="mt-2 text-sm text-plum-900/60 dark:text-cream-100/60">The page you're looking for doesn't exist.</p>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="min-h-[60vh]"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/scheduler" element={<Scheduler />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  )
}

function AppShell() {
  const { isDark } = useTheme()

  const toastOptions = useMemo(
    () => ({
      style: {
        background: isDark ? '#131120' : '#FDFBF6',
        color: isDark ? '#F7F2E9' : '#1C1330',
        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(28,19,48,0.08)',
        borderRadius: '14px',
        fontSize: '13px',
      },
    }),
    [isDark]
  )

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <CustomCursor />
      <Toaster position="bottom-right" toastOptions={toastOptions} />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BookingsProvider>
        <AppShell />
      </BookingsProvider>
    </ThemeProvider>
  )
}

export default App
