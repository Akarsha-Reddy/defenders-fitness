export type Review = {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

export type PlaceDetails = {
  rating: number;
  user_ratings_total: number;
  reviews: Review[];
};

export const fallbackReviews: PlaceDetails = {
  rating: 4.9,
  user_ratings_total: 487,
  reviews: [
    {
      author_name: "Rahul M",
      author_url: "#",
      profile_photo_url: "",
      rating: 5,
      relative_time_description: "2 weeks ago",
      text: "Best gym in Vijaya Bank Layout. The trainers are top-notch and the equipment is always well-maintained. Highly recommend the HIIT classes!",
      time: 1690000000
    },
    {
      author_name: "Priya S",
      author_url: "#",
      profile_photo_url: "",
      rating: 5,
      relative_time_description: "A month ago",
      text: "I've been a member for 2 years. The community here is incredible. Vikram and Aisha really know how to push you to your limits safely.",
      time: 1680000000
    },
    {
      author_name: "Arjun K",
      author_url: "#",
      profile_photo_url: "",
      rating: 4,
      relative_time_description: "2 months ago",
      text: "Great facility. Gets a bit crowded during peak evening hours, but otherwise perfect. The boxing ring is a huge plus.",
      time: 1670000000
    },
    {
      author_name: "Neha R",
      author_url: "#",
      profile_photo_url: "",
      rating: 5,
      relative_time_description: "3 months ago",
      text: "Extremely clean locker rooms and very professional staff. The 24/7 access makes it super convenient for my erratic work schedule.",
      time: 1660000000
    },
    {
      author_name: "Karan T",
      author_url: "#",
      profile_photo_url: "",
      rating: 5,
      relative_time_description: "4 months ago",
      text: "If you are serious about strength training, this is the place. Multiple squat racks and heavy dumbbells. No waiting around.",
      time: 1650000000
    }
  ]
};
