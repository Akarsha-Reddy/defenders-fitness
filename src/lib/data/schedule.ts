export type ScheduleClass = {
  id: string;
  title: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: string; // e.g. "06:00 AM"
  duration: number; // in minutes
  category: 'Strength' | 'Cardio' | 'HIIT' | 'Boxing' | 'Yoga';
  trainer: {
    name: string;
    image: string;
  };
  maxSpots: number;
  currentEnrollment: number;
};

// Hardcoded baseline data until Sanity is populated
export const hardcodedSchedule: ScheduleClass[] = [
  // Monday
  {
    id: 'mon-1',
    title: 'Morning Powerlift',
    day: 'Mon',
    time: '06:00 AM',
    duration: 60,
    category: 'Strength',
    trainer: { name: 'Chandra Mohan', image: '/images/placeholder/trainer-1.svg' },
    maxSpots: 12,
    currentEnrollment: 12, // Full
  },
  {
    id: 'mon-2',
    title: 'Sweat & Shred',
    day: 'Mon',
    time: '07:30 AM',
    duration: 45,
    category: 'HIIT',
    trainer: { name: 'Shahid', image: '/images/placeholder/trainer-2.svg' },
    maxSpots: 20,
    currentEnrollment: 15,
  },
  {
    id: 'mon-3',
    title: 'Fundamentals of Striking',
    day: 'Mon',
    time: '06:00 PM',
    duration: 60,
    category: 'Boxing',
    trainer: { name: "Trainer 4", image: '/images/placeholder/trainer-4.svg' },
    maxSpots: 16,
    currentEnrollment: 10,
  },
  // Tuesday
  {
    id: 'tue-1',
    title: 'Endurance Build',
    day: 'Tue',
    time: '06:30 AM',
    duration: 60,
    category: 'Cardio',
    trainer: { name: 'Trainer 3', image: '/images/placeholder/trainer-3.svg' },
    maxSpots: 20,
    currentEnrollment: 18, // Almost full
  },
  {
    id: 'tue-2',
    title: 'Functional Flow',
    day: 'Tue',
    time: '05:30 PM',
    duration: 60,
    category: 'Yoga',
    trainer: { name: 'Shahid', image: '/images/placeholder/trainer-2.svg' },
    maxSpots: 15,
    currentEnrollment: 8,
  },
  // Wednesday
  {
    id: 'wed-1',
    title: 'Barbell Club',
    day: 'Wed',
    time: '06:00 AM',
    duration: 60,
    category: 'Strength',
    trainer: { name: 'Chandra Mohan', image: '/images/placeholder/trainer-1.svg' },
    maxSpots: 12,
    currentEnrollment: 11,
  },
  {
    id: 'wed-2',
    title: 'Cardio Core',
    day: 'Wed',
    time: '08:00 AM',
    duration: 45,
    category: 'HIIT',
    trainer: { name: 'Trainer 3', image: '/images/placeholder/trainer-3.svg' },
    maxSpots: 20,
    currentEnrollment: 20, // Full
  },
  // Thursday
  {
    id: 'thu-1',
    title: 'Mobility & Flow',
    day: 'Thu',
    time: '07:00 AM',
    duration: 60,
    category: 'Yoga',
    trainer: { name: 'Shahid', image: '/images/placeholder/trainer-2.svg' },
    maxSpots: 15,
    currentEnrollment: 4,
  },
  {
    id: 'thu-2',
    title: 'Heavy Bag Work',
    day: 'Thu',
    time: '06:30 PM',
    duration: 60,
    category: 'Boxing',
    trainer: { name: "Trainer 4", image: '/images/placeholder/trainer-4.svg' },
    maxSpots: 16,
    currentEnrollment: 14,
  },
  // Friday
  {
    id: 'fri-1',
    title: 'Metcon Friday',
    day: 'Fri',
    time: '06:00 AM',
    duration: 45,
    category: 'HIIT',
    trainer: { name: 'Chandra Mohan', image: '/images/placeholder/trainer-1.svg' },
    maxSpots: 24,
    currentEnrollment: 22,
  },
  {
    id: 'fri-2',
    title: 'Power Yoga',
    day: 'Fri',
    time: '05:00 PM',
    duration: 60,
    category: 'Yoga',
    trainer: { name: 'Trainer 3', image: '/images/placeholder/trainer-3.svg' },
    maxSpots: 15,
    currentEnrollment: 15, // Full
  },
  // Saturday
  {
    id: 'sat-1',
    title: 'Weekend Warrior',
    day: 'Sat',
    time: '08:00 AM',
    duration: 90,
    category: 'HIIT',
    trainer: { name: 'Shahid', image: '/images/placeholder/trainer-2.svg' },
    maxSpots: 30,
    currentEnrollment: 28,
  },
  {
    id: 'sat-2',
    title: 'Sparring Drills',
    day: 'Sat',
    time: '10:00 AM',
    duration: 60,
    category: 'Boxing',
    trainer: { name: "Trainer 4", image: '/images/placeholder/trainer-4.svg' },
    maxSpots: 16,
    currentEnrollment: 6,
  },
  // Sunday
  {
    id: 'sun-1',
    title: 'Active Recovery',
    day: 'Sun',
    time: '09:00 AM',
    duration: 60,
    category: 'Yoga',
    trainer: { name: 'Chandra Mohan', image: '/images/placeholder/trainer-1.svg' },
    maxSpots: 20,
    currentEnrollment: 5,
  },
];
