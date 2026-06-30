import { createContext, useContext, useState, useMemo, useCallback } from 'react'
import toast from 'react-hot-toast'
import { INITIAL_BOOKINGS } from '../data/mockData'

const BookingsContext = createContext(null)

let nextId = 2000

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS)

  const addBooking = useCallback((booking) => {
    const id = `bk-${nextId++}`
    setBookings((prev) => [{ ...booking, id, status: 'upcoming' }, ...prev])
    toast.success('Booking confirmed — added to your dashboard', {
      icon: '🎟️',
    })
    return id
  }, [])

  const cancelBooking = useCallback((id) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)))
    toast('Booking cancelled', { icon: '🗑️' })
  }, [])

  const upcoming = useMemo(() => bookings.filter((b) => b.status === 'upcoming'), [bookings])
  const past = useMemo(() => bookings.filter((b) => b.status === 'past'), [bookings])
  const cancelled = useMemo(() => bookings.filter((b) => b.status === 'cancelled'), [bookings])

  const value = useMemo(
    () => ({ bookings, addBooking, cancelBooking, upcoming, past, cancelled }),
    [bookings, addBooking, cancelBooking, upcoming, past, cancelled]
  )

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>
}

export function useBookings() {
  const ctx = useContext(BookingsContext)
  if (!ctx) throw new Error('useBookings must be used within BookingsProvider')
  return ctx
}
