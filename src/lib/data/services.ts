import {
  Dumbbell,
  HeartPulse,
  Timer,
  Users,
  Utensils,
  Swords,
} from "lucide-react";

export const services = [
  {
    id: "strength",
    title: "Strength Training",
    description: "Build raw power and muscle mass with our world-class free weights and machines.",
    icon: Dumbbell,
  },
  {
    id: "cardio",
    title: "Cardio Zone",
    description: "Boost your endurance with state-of-the-art treadmills, rowers, and assault bikes.",
    icon: HeartPulse,
  },
  {
    id: "hiit",
    title: "HIIT Classes",
    description: "High-intensity interval training designed to torch calories and maximize conditioning.",
    icon: Timer,
  },
  {
    id: "personal-training",
    title: "Personal Training",
    description: "1-on-1 coaching customized to your goals, biomechanics, and lifestyle.",
    icon: Users,
  },
  {
    id: "nutrition",
    title: "Nutrition Coaching",
    description: "Science-backed meal plans and habit tracking to fuel your performance.",
    icon: Utensils,
  },
  {
    id: "boxing",
    title: "Boxing & MMA",
    description: "Develop striking skills, agility, and mental toughness in our dedicated combat area.",
    icon: Swords,
  },
];
