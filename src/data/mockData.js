// All data here is static/mock — this is a frontend-only UI project.
// In a real product this would come from an API.

export const EVENT_TYPES = [
  { id: 'wedding', label: 'Wedding', icon: 'Heart', basePrice: 4500, perGuest: 85, description: 'Full-service ceremony & reception' },
  { id: 'birthday', label: 'Birthday', icon: 'Cake', basePrice: 800, perGuest: 35, description: 'Milestone birthdays, done right' },
  { id: 'corporate', label: 'Corporate', icon: 'Briefcase', basePrice: 2200, perGuest: 60, description: 'Conferences, launches, off-sites' },
  { id: 'concert', label: 'Concert / Show', icon: 'Music', basePrice: 6200, perGuest: 40, description: 'Live performances & stage shows' },
  { id: 'engagement', label: 'Engagement', icon: 'Gem', basePrice: 1800, perGuest: 70, description: 'Intimate celebrations of "yes"' },
  { id: 'graduation', label: 'Graduation', icon: 'GraduationCap', basePrice: 950, perGuest: 30, description: 'Cap-toss-worthy send-offs' },
]

export const PACKAGE_TIERS = [
  { id: 'essential', label: 'Essential', multiplier: 1, blurb: 'Venue, seating & coordination' },
  { id: 'signature', label: 'Signature', multiplier: 1.45, blurb: 'Adds catering, decor & photography' },
  { id: 'encore', label: 'Encore', multiplier: 2.1, blurb: 'Full production: lighting, AV & live music' },
]

export const ADDONS = [
  { id: 'photography', label: 'Photography', price: 650, icon: 'Camera' },
  { id: 'catering', label: 'Premium Catering', price: 1200, icon: 'UtensilsCrossed' },
  { id: 'decor', label: 'Floral & Decor', price: 480, icon: 'Flower2' },
  { id: 'liveband', label: 'Live Band', price: 1500, icon: 'Music2' },
  { id: 'lighting', label: 'Architectural Lighting', price: 390, icon: 'Lightbulb' },
]

export const VENDORS = [
  {
    id: 'v1',
    name: 'The Marbled Hall',
    category: 'Venue',
    rating: 4.9,
    reviews: 212,
    priceFrom: 3200,
    image: 'https://picsum.photos/seed/marquee-venue-1/640/480',
    tags: ['Indoor', '200+ capacity', 'Parking'],
  },
  {
    id: 'v2',
    name: 'Atelier Lumière',
    category: 'Photography',
    rating: 4.8,
    reviews: 156,
    priceFrom: 650,
    image: 'https://picsum.photos/seed/marquee-photo-1/640/480',
    tags: ['Cinematic', 'Drone', 'Same-day edit'],
  },
  {
    id: 'v3',
    name: 'Saffron & Salt Catering',
    category: 'Catering',
    rating: 4.7,
    reviews: 304,
    priceFrom: 45,
    image: 'https://picsum.photos/seed/marquee-catering-1/640/480',
    tags: ['Tasting menu', 'Vegan options', 'Live stations'],
  },
  {
    id: 'v4',
    name: 'Velvet Rope Decor',
    category: 'Decor',
    rating: 4.6,
    reviews: 98,
    priceFrom: 480,
    image: 'https://picsum.photos/seed/marquee-decor-1/640/480',
    tags: ['Floral arches', 'Centerpieces', 'Custom backdrops'],
  },
  {
    id: 'v5',
    name: 'The Garden Pavilion',
    category: 'Venue',
    rating: 4.9,
    reviews: 271,
    priceFrom: 2800,
    image: 'https://picsum.photos/seed/marquee-venue-2/640/480',
    tags: ['Outdoor', 'Garden', '150 capacity'],
  },
  {
    id: 'v6',
    name: 'Pulse Live Sound',
    category: 'Entertainment',
    rating: 4.8,
    reviews: 142,
    priceFrom: 1500,
    image: 'https://picsum.photos/seed/marquee-band-1/640/480',
    tags: ['Live band', 'DJ sets', 'Full AV'],
  },
  {
    id: 'v7',
    name: 'Frame & Flash Studio',
    category: 'Photography',
    rating: 4.5,
    reviews: 87,
    priceFrom: 520,
    image: 'https://picsum.photos/seed/marquee-photo-2/640/480',
    tags: ['Candid', 'Albums', '2 shooters'],
  },
  {
    id: 'v8',
    name: 'Copper Kettle Caterers',
    category: 'Catering',
    rating: 4.6,
    reviews: 176,
    priceFrom: 38,
    image: 'https://picsum.photos/seed/marquee-catering-2/640/480',
    tags: ['Buffet', 'Plated service', 'Dessert bar'],
  },
]

export const VENDOR_CATEGORIES = ['All', 'Venue', 'Photography', 'Catering', 'Decor', 'Entertainment']

// Calendar mock — a map of ISO date -> slot status, for the current month view
export const SLOT_STATUS = {
  AVAILABLE: 'available',
  LIMITED: 'limited',
  BOOKED: 'booked',
  PAST: 'past',
}

export function generateMonthSlots(year, month) {
  // month is 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const slots = {}
  for (let day = 1; day <= daysInMonth; day++) {
    const seed = (day * 17 + month * 31) % 10
    let status = SLOT_STATUS.AVAILABLE
    if (seed < 2) status = SLOT_STATUS.BOOKED
    else if (seed < 4) status = SLOT_STATUS.LIMITED
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    slots[key] = status
  }
  return slots
}

export const TIME_SLOTS = [
  '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM',
  '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM',
]

export const INITIAL_BOOKINGS = [
  {
    id: 'bk-1001',
    title: 'Hassan & Areeba — Wedding Reception',
    type: 'Wedding',
    date: '2026-07-18',
    time: '06:00 PM',
    guests: 220,
    venue: 'The Marbled Hall',
    status: 'upcoming',
    price: 23250,
    cover: 'https://picsum.photos/seed/marquee-booking-1/600/400',
  },
  {
    id: 'bk-1002',
    title: 'Nexora Tech — Annual Summit',
    type: 'Corporate',
    date: '2026-07-26',
    time: '09:00 AM',
    guests: 140,
    venue: 'The Garden Pavilion',
    status: 'upcoming',
    price: 10600,
    cover: 'https://picsum.photos/seed/marquee-booking-2/600/400',
  },
  {
    id: 'bk-1003',
    title: "Zoya's 18th Birthday Bash",
    type: 'Birthday',
    date: '2026-08-02',
    time: '04:30 PM',
    guests: 60,
    venue: 'The Marbled Hall',
    status: 'upcoming',
    price: 2900,
    cover: 'https://picsum.photos/seed/marquee-booking-3/600/400',
  },
  {
    id: 'bk-0991',
    title: 'Khan Family Engagement',
    type: 'Engagement',
    date: '2026-05-12',
    time: '07:30 PM',
    guests: 90,
    venue: 'The Garden Pavilion',
    status: 'past',
    price: 6300,
    cover: 'https://picsum.photos/seed/marquee-booking-4/600/400',
  },
  {
    id: 'bk-0987',
    title: 'Lumen Records — Album Launch Show',
    type: 'Concert / Show',
    date: '2026-04-30',
    time: '08:00 PM',
    guests: 480,
    venue: 'The Marbled Hall',
    status: 'past',
    price: 24800,
    cover: 'https://picsum.photos/seed/marquee-booking-5/600/400',
  },
  {
    id: 'bk-0972',
    title: 'UET CS Batch — Graduation Dinner',
    type: 'Graduation',
    date: '2026-04-10',
    time: '06:00 PM',
    guests: 150,
    venue: 'The Garden Pavilion',
    status: 'cancelled',
    price: 5500,
    cover: 'https://picsum.photos/seed/marquee-booking-6/600/400',
  },
]

export const STATS = [
  { id: 'events', label: 'Events hosted', value: 1284, suffix: '+' },
  { id: 'satisfaction', label: 'On-time delivery', value: 98, suffix: '%' },
  { id: 'vendors', label: 'Vetted vendors', value: 312, suffix: '' },
  { id: 'cities', label: 'Cities covered', value: 24, suffix: '' },
]

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Areeba H.',
    role: 'Bride, July 2026',
    quote: 'Every vendor showed up exactly on schedule. The live availability calendar removed all the back-and-forth.',
    initials: 'AH',
  },
  {
    id: 't2',
    name: 'Omar F.',
    role: 'Head of Events, Nexora Tech',
    quote: 'We booked our entire summit — venue, catering and AV — in one sitting. The price breakdown made budgeting painless.',
    initials: 'OF',
  },
  {
    id: 't3',
    name: 'Sana K.',
    role: 'Parent, Birthday host',
    quote: 'The dashboard kept every detail in one place, and the reminders meant nothing slipped through the cracks.',
    initials: 'SK',
  },
]
