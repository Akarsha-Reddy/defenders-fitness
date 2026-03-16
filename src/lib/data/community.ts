// src/lib/data/community.ts

export type LeaderboardEntry = {
  id: string;
  firstName: string;
  checkIns: number;
  goalBadge: string;
};

export type Milestone = {
  id: string;
  icon: string;
  title: string;
  memberName: string;
  story: string;
  date: string;
};

export type InstagramPost = {
  id: string;
  postUrl: string;
  thumbnail: string;
  likes: number;
};

// TAB 1: Leaderboard (Mock Data if Sanity unavailable)
export const mockLeaderboard: LeaderboardEntry[] = [
  { id: 'lb-1', firstName: 'Rahul', checkIns: 24, goalBadge: 'Muscle Gain' },
  { id: 'lb-2', firstName: 'Priya', checkIns: 21, goalBadge: 'Weight Loss' },
  { id: 'lb-3', firstName: 'Arjun', checkIns: 19, goalBadge: 'Strength' },
  { id: 'lb-4', firstName: 'Sneha', checkIns: 18, goalBadge: 'Consistency' },
  { id: 'lb-5', firstName: 'Karan', checkIns: 16, goalBadge: 'Marathon Prep' },
];

// TAB 2: Milestones (Static Data)
export const milestones: Milestone[] = [
  {
    id: 'ms-1',
    icon: '🎉',
    title: '500th Member',
    memberName: 'Vikram & Team',
    story: 'We hit an incredible milestone this month! 500 active members strong, building a community of discipline and fitness.',
    date: 'Oct 2023'
  },
  {
    id: 'ms-2',
    icon: '🔥',
    title: '1000 Classes Completed',
    memberName: 'Aisha (Head Coach)',
    story: 'Aisha successfully led her 1000th HIIT session. Countless calories burned and thousands of burpees conquered.',
    date: 'Aug 2023'
  },
  {
    id: 'ms-3',
    icon: '🏢',
    title: '5 Years Open',
    memberName: 'Defenders Fitness HQ',
    story: 'Celebrating half a decade of transforming lives in the heart of Vijaya Bank Layout. To many more years of strength.',
    date: 'May 2023'
  }
];

// TAB 3: Instagram (Mock Data if Sanity unavailable)
export const mockInstagramPosts: InstagramPost[] = [
  { id: 'ig-1', postUrl: '#', thumbnail: '/images/placeholder/ig-1.svg', likes: 124 },
  { id: 'ig-2', postUrl: '#', thumbnail: '/images/placeholder/ig-2.svg', likes: 89 },
  { id: 'ig-3', postUrl: '#', thumbnail: '/images/placeholder/ig-3.svg', likes: 256 },
  { id: 'ig-4', postUrl: '#', thumbnail: '/images/placeholder/ig-4.svg', likes: 180 },
  { id: 'ig-5', postUrl: '#', thumbnail: '/images/placeholder/ig-5.svg', likes: 312 },
  { id: 'ig-6', postUrl: '#', thumbnail: '/images/placeholder/ig-6.svg', likes: 145 },
];
