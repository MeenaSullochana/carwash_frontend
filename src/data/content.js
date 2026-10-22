import {
  Award,
  CalendarClock,
  Car,
  Droplets,
  Gem,
  KeyRound,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { images } from '../assets/images'

export const brand = {
  name: 'GEEKAY KLEAN KARE',
  tagline: 'Your Car Deserves a Luxury Experience.',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'hello@luxoraauto.com',
  whatsappHref: 'https://wa.me/919876543210',
  address: 'SF No. 356/6A3A, Sri Vasuvui Nagar, Sungavarchatram, SIPCOT Industrial Park, Sriperumbudur.',
  mapEmbed: 'https://www.google.com/maps?q=Sungavarchatram,SIPCOT+Industrial+Park,Sriperumbudur&output=embed',
  mapLink: 'https://maps.google.com/?q=Sungavarchatram,SIPCOT+Industrial+Park,Sriperumbudur',
  appStoreHref: 'https://apps.apple.com/',
  playStoreHref: 'https://play.google.com/store',
}

export const businessHours = [
  { days: 'Monday – Friday', time: '09:00 AM – 08:00 PM' },
  { days: 'Saturday', time: '08:00 AM – 09:00 PM' },
  { days: 'Sunday', time: '09:00 AM – 06:00 PM' },
]

export const contactTopics = ['Booking Enquiry', 'Service Pricing', 'Doorstep Service', 'Ceramic / PPF Quote', 'Feedback', 'Other']

export const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
]

export const stats = [
  { value: 5000, suffix: '+', label: 'Cars Detailed', separator: true },
  { value: 12, suffix: '+', label: 'Premium Services' },
  { value: 4.9, suffix: '/5', label: 'Customer Rating', decimals: 1 },
  { value: 8, suffix: '+', label: 'Years Experience' },
]

export const services = [
  {
    id: 'protection-packages',
    number: '01',
    title: 'Premium Protection Packages',
    description: 'Bundled wash, polish and coating plans for complete long-term care.',
    price: '₹4,999',
    image: images.premiumCar,
    alt: 'Black Tata Safari on an Indian highway at sunset with its LED tail light bar glowing',
  },
  {
    id: 'car-wash',
    number: '02',
    title: 'Car Wash Service',
    description: 'High-pressure rinse and pH-neutral hand wash for a spotless finish.',
    price: '₹499',
    image: images.spaDetailing,
    alt: 'High-pressure rinse spraying across the rear of a black Hyundai Creta',
  },
  {
    id: 'foam-wash',
    number: '03',
    title: 'Foam Wash',
    description: 'Thick snow-foam pre-wash that lifts dirt safely without scratching.',
    price: '₹699',
    image: images.exteriorWash,
    alt: 'Detailer hand-washing a grey Tata Nexon covered in thick snow foam',
  },
  {
    id: 'interior',
    number: '04',
    title: 'Interior Car Cleaning',
    description: 'Steam-cleaned cabins, conditioned leather and a showroom-fresh feel.',
    price: '₹1,299',
    image: images.interiorCleaning,
    alt: 'Spotless SUV cabin with black and tan leather seats, steering wheel and touchscreen',
  },
  {
    id: 'polish',
    number: '05',
    title: 'Car Polish',
    description: 'Machine polishing that removes swirls and restores a mirror-like gloss.',
    price: '₹1,999',
    image: images.carDetailing,
    alt: "Deep, mirror-like gloss on a red SUV's freshly polished front end",
  },
  {
    id: 'ceramic',
    number: '06',
    title: 'Ceramic Coating',
    description: '9H nano-ceramic protection with deep gloss and extreme water beading.',
    price: '₹14,999',
    image: images.ceramicCoating,
    alt: 'Water beading on the rear of a ceramic-coated Kia Seltos in the monsoon rain',
  },
  {
    id: 'teflon',
    number: '07',
    title: 'Teflon Coating',
    description: 'Slick Teflon sealant that guards paint against UV, dust and stains.',
    price: '₹2,999',
    image: images.teflonCoating,
    alt: 'Gloved detailer applying Teflon sealant to the glossy bonnet of a grey car',
  },
  {
    id: 'ppf',
    number: '08',
    title: 'Paint Protection Film',
    description: 'Invisible self-healing film that shields paint from chips and scratches.',
    price: '₹49,999',
    image: images.paintProtectionFilm,
    alt: 'Technician installing clear paint protection film on a black car bumper',
  },
  {
    id: 'tyre',
    number: '09',
    title: 'Tyre Service',
    description: 'Deep wheel cleaning, tyre dressing and a rich satin-black finish.',
    price: '₹399',
    image: images.tyreService,
    alt: 'Detailer brushing a clean, glossy tyre and alloy wheel on a black car',
  },
]

export const vehicleTypes = ['Hatchback', 'Sedan', 'SUV / MUV', 'Luxury / Sports']
export const serviceOptions = services.map((service) => service.title)
export const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM']

export const packages = [
  {
    id: 'essential',
    label: 'Package 01',
    name: 'Essential',
    price: '₹1,499',
    note: 'Ideal for regular upkeep',
    features: ['Exterior Wash', 'Interior Vacuum', 'Dashboard Cleaning', 'Tyre Dressing'],
  },
  {
    id: 'signature',
    label: 'Package 02',
    name: 'Signature',
    price: '₹2,999',
    note: 'Our most-loved transformation',
    featured: true,
    features: [
      'Everything in Essential',
      'Deep Interior Cleaning',
      'Paint Polish',
      'Engine Bay Cleaning',
    ],
  },
  {
    id: 'ultimate',
    label: 'Package 03',
    name: 'Ultimate',
    price: '₹5,999',
    note: 'Concours-level perfection',
    features: [
      'Everything in Signature',
      'Ceramic Protection',
      'Premium Interior Treatment',
      'Full Paint Correction',
    ],
  },
]

export const carFeatures = [
  { label: 'Ceramic Protection', detail: '9H nano-coating', icon: ShieldCheck },
  { label: 'Paint Correction', detail: 'Multi-stage polish', icon: Sparkles },
  { label: 'Interior Care', detail: 'Leather & fabric', icon: Droplets },
  { label: 'Premium Finish', detail: 'Mirror-grade gloss', icon: Gem },
]

export const benefits = [
  {
    icon: Droplets,
    title: 'Foam & Pressure Wash',
    description: 'Thick snow-foam pre-soak and a controlled high-pressure rinse lift dirt and grit before a mitt ever touches your paint.',
  },
  {
    icon: ShieldCheck,
    title: 'Scratch-Safe Washing',
    description: 'Two-bucket method, pH-neutral shampoo and soft microfibre drying — no harsh brushes, no swirl marks.',
  },
  {
    icon: Sparkles,
    title: 'Inside & Out, Every Time',
    description: 'Every wash includes interior vacuuming, dashboard wipe-down, streak-free glass and glossy tyre dressing.',
  },
  {
    icon: MapPin,
    title: 'Quick Wash or Doorstep',
    description: 'Most washes are done in under an hour at our Sriperumbudur studio — or book our mobile unit to wash at your home or office.',
  },
]

export const steps = [
  { number: '01', title: 'Choose Service', description: 'Pick a service or package tailored to your car.', icon: Car },
  { number: '02', title: 'Pick Date & Time', description: 'Reserve a slot that fits your schedule in seconds.', icon: CalendarClock },
  { number: '03', title: 'Bring Your Car', description: 'Drop it at our studio or choose doorstep service.', icon: KeyRound },
  { number: '04', title: 'Drive Away Fresh', description: 'Collect a car that looks and feels brand new.', icon: Sparkles },
]

export const testimonials = [
  {
    quote: 'Absolutely incredible service. My car looked better than the day I bought it.',
    name: 'Arjun R.',
    car: 'BMW 5 Series',
    service: 'Signature Package',
  },
  {
    quote:
      'The ceramic coating is unreal — water just slides off. The team explained every step and delivered on time.',
    name: 'Meera K.',
    car: 'Mercedes-Benz GLC',
    service: 'Ceramic Coating',
  },
  {
    quote:
      'Booking took under a minute and the doorstep crew was meticulous. My interior smells and feels brand new.',
    name: 'Rohan S.',
    car: 'Hyundai Creta',
    service: 'Interior Deep Clean',
  },
]

export const galleryCategories = ['All', 'Exterior', 'Interior', 'Protection', 'Showroom']

export const galleryItems = [
  {
    id: 'g-hero',
    title: 'Mahindra Scorpio-N',
    service: 'Signature Detail',
    category: 'Showroom',
    image: images.heroCar,
    alt: 'Black Mahindra Scorpio-N under dramatic studio lighting',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'g-foam',
    title: 'Snow Foam Pre-wash',
    service: 'Exterior Detailing',
    category: 'Exterior',
    image: images.exteriorWash,
    alt: 'Detailer hand-washing a grey Tata Nexon covered in thick snow foam',
    span: '',
  },
  {
    id: 'g-ceramic',
    title: 'Kia Seltos Coating',
    service: 'Ceramic Coating',
    category: 'Protection',
    image: images.ceramicCoating,
    alt: 'Water beading on the rear of a ceramic-coated Kia Seltos in the monsoon rain',
    span: 'md:row-span-2',
  },
  {
    id: 'g-interior',
    title: 'Leather Cabin Revival',
    service: 'Interior Deep Clean',
    category: 'Interior',
    image: images.interiorCleaning,
    alt: 'Spotless SUV cabin with black and tan leather seats, steering wheel and touchscreen',
    span: '',
  },
  {
    id: 'g-gloss',
    title: 'Mirror Gloss Finish',
    service: 'Paint Correction',
    category: 'Protection',
    image: images.carDetailing,
    alt: "Deep, mirror-like gloss on a red SUV's freshly polished front end",
    span: 'md:col-span-2',
  },
  {
    id: 'g-rinse',
    title: 'High-pressure Rinse',
    service: 'Full Car Spa',
    category: 'Exterior',
    image: images.spaDetailing,
    alt: 'High-pressure rinse spraying across the rear of a black Hyundai Creta',
    span: '',
  },
  {
    id: 'g-safari',
    title: 'Tata Safari',
    service: 'Ultimate Package',
    category: 'Showroom',
    image: images.premiumCar,
    alt: 'Black Tata Safari on an Indian highway at sunset with its LED tail light bar glowing',
    span: 'md:col-span-2',
  },
  {
    id: 'g-xuv700',
    title: 'Mahindra XUV700',
    service: 'Ceramic Coating',
    category: 'Showroom',
    image: images.luxuryCar,
    alt: 'Front of a white Mahindra XUV700 with glowing headlights on a Mumbai street at night',
    span: '',
  },
]

export const faqs = [
  {
    q: 'How long does a full car spa take?',
    a: 'Most Full Car Spa sessions take 3–4 hours. Ceramic coating and full paint correction need 1–2 days so the coating can cure properly — we will give you an exact timeline when you book.',
  },
  {
    q: 'Do you offer doorstep service?',
    a: 'Yes. Our fully equipped mobile unit brings water, power and professional tools to your home or office. Doorstep pickup and drop is free within 10 km of our Sriperumbudur studio.',
  },
  {
    q: 'How long does ceramic coating last?',
    a: 'Our 9H ceramic coating protects your paint for up to 5 years with proper care. Every coating comes with a written warranty and a free inspection after the first 6 months.',
  },
  {
    q: 'Which products do you use?',
    a: 'We only use pH-neutral shampoos, boutique waxes and professional-grade ceramic systems that are safe for every paint, wrap and PPF finish.',
  },
  {
    q: 'Is it safe for new or luxury cars?',
    a: 'Absolutely. Our certified detailers work on everything from brand-new Nexons to luxury SUVs every week, use paint-depth gauges before any polishing, and follow a scratch-free two-bucket wash method.',
  },
  {
    q: 'Can I reschedule or cancel my booking?',
    a: 'Yes — you can reschedule or cancel for free up to 12 hours before your slot. Just call our concierge or reply to your booking confirmation message.',
  },
]

export const moreFaqs = [
  {
    q: 'What payment methods do you accept?',
    a: 'We accept UPI, all major credit and debit cards, net banking and cash. Payment is collected only after you have inspected your car and are happy with the result.',
  },
  {
    q: 'Do I need to be present during the service?',
    a: 'Not at all. Hand over the keys at our studio or to our doorstep crew and we will send photo updates on WhatsApp as the work progresses.',
  },
  {
    q: 'How often should I detail my car?',
    a: 'We recommend an Essential wash every 2–3 weeks, a Signature detail every 3 months and a ceramic top-up once a year to keep your paint in peak condition.',
  },
  {
    q: 'Can I wash my car after ceramic coating?',
    a: 'Please wait 7 days before the first wash so the coating fully hardens. After that, a pH-neutral hand wash is all you need — no waxing required.',
  },
]

export const aboutStory = {
  image: images.carDetailing,
  alt: "Deep, mirror-like gloss on a red SUV's freshly polished front end",
  paragraphs: [
    'Geekay Klean Kare began in 2018 as a two-bay garage in Sriperumbudur, started by a group of car enthusiasts who were tired of swirl marks, rushed washes and harsh chemicals.',
    'Today we are a climate-controlled studio and a fleet of mobile units, trusted by thousands of owners — from daily hatchbacks to premium SUVs. The obsession has not changed: every car leaves looking better than the day it was delivered.',
  ],
}

export const values = [
  { icon: Gem, title: 'Obsessive Detail', description: 'Multi-stage inspections under studio lighting before any car is handed back.' },
  { icon: ShieldCheck, title: 'Paint-safe Process', description: 'Two-bucket washes, paint-depth gauges and pH-neutral chemistry on every job.' },
  { icon: Droplets, title: 'Eco-conscious Care', description: 'Water-recycling systems and biodegradable products that are gentle on the planet.' },
  { icon: Award, title: 'Honest Pricing', description: 'Transparent quotes with no hidden extras — you approve every add-on first.' },
]

export const milestones = [
  { year: '2018', title: 'The first bay', description: 'Geekay Klean Kare opens a two-bay detailing garage in Sriperumbudur.' },
  { year: '2020', title: 'Doorstep service', description: 'Our first fully equipped mobile unit hits the road.' },
  { year: '2022', title: 'Ceramic studio', description: 'A dedicated climate-controlled bay for coatings and PPF.' },
  { year: '2026', title: '5,000+ cars', description: 'A milestone built on referrals and repeat customers.' },
]

export const packageComparison = [
  { feature: 'Exterior Foam Wash', tiers: [true, true, true] },
  { feature: 'Interior Vacuum', tiers: [true, true, true] },
  { feature: 'Dashboard & Trim Cleaning', tiers: [true, true, true] },
  { feature: 'Tyre Dressing', tiers: [true, true, true] },
  { feature: 'Deep Interior Cleaning', tiers: [false, true, true] },
  { feature: 'Paint Polish', tiers: [false, true, true] },
  { feature: 'Engine Bay Cleaning', tiers: [false, true, true] },
  { feature: 'Ceramic Protection', tiers: [false, false, true] },
  { feature: 'Premium Interior Treatment', tiers: [false, false, true] },
  { feature: 'Full Paint Correction', tiers: [false, false, true] },
  { feature: 'Time Required', tiers: ['1.5 hrs', '4 hrs', '1–2 days'] },
]

export const addOns = [
  { title: 'Headlight Restoration', price: '₹799', icon: Sparkles },
  { title: 'Odour Removal', price: '₹599', icon: Droplets },
  { title: 'Glass Coating', price: '₹1,499', icon: ShieldCheck },
  { title: 'Doorstep Pickup', price: 'Free*', icon: MapPin },
]

export const reviewSummary = {
  rating: 4.9,
  total: '1,200+',
  breakdown: [
    { stars: 5, percent: 92 },
    { stars: 4, percent: 6 },
    { stars: 3, percent: 1 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
}

export const reviews = [
  {
    quote: 'They picked up my car from the office and returned it spotless by evening. Seamless experience.',
    name: 'Priya N.',
    car: 'Audi Q5',
    service: 'Doorstep Spa',
  },
  {
    quote: 'Paint correction removed years of swirl marks. The gloss under sunlight is unbelievable.',
    name: 'Karthik V.',
    car: 'Honda City',
    service: 'Paint Correction',
  },
  {
    quote: 'PPF install was flawless — no edges, no bubbles. Worth every rupee for peace of mind.',
    name: 'Ananya D.',
    car: 'Mahindra XUV700',
    service: 'Paint Protection Film',
  },
  {
    quote: 'Transparent pricing and they sent progress photos on WhatsApp the whole time. Very professional.',
    name: 'Vikram P.',
    car: 'Toyota Fortuner',
    service: 'Ultimate Package',
  },
  {
    quote: 'My kids had destroyed the back seats. Geekay Klean Kare made the cabin look and smell brand new.',
    name: 'Sneha M.',
    car: 'Kia Carens',
    service: 'Interior Deep Clean',
  },
  {
    quote: 'Been coming every month for two years. Consistent quality every single time.',
    name: 'Rahul T.',
    car: 'Skoda Octavia',
    service: 'Essential Package',
  },
]

export const footerLinks = {
  services: [
    { label: 'Exterior Detailing', href: '/services' },
    { label: 'Interior Cleaning', href: '/services' },
    { label: 'Ceramic Coating', href: '/services' },
    { label: 'Full Car Spa', href: '/services' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Packages', href: '/packages' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
}
