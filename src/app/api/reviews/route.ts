import { NextResponse } from 'next/server';

export const revalidate = 86400; // Cache for 24 hours

// Replace with the actual Google Place ID for Defenders Fitness
const PLACE_ID = 'ChIJN1t_tDeuEmsRUsoyG83frY4'; 
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

import { fallbackReviews, type Review } from '@/lib/data/reviews-data';

export async function GET() {
  try {
    if (!API_KEY) {
      return NextResponse.json(fallbackReviews);
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.result) {
      // Filter out reviews below 4 stars as requested
      const filteredReviews = (data.result.reviews || []).filter((r: Review) => r.rating >= 4);
      
      return NextResponse.json({
        rating: data.result.rating,
        user_ratings_total: data.result.user_ratings_total,
        reviews: filteredReviews
      });
    }

    // If API fails or status is not OK, use fallback
    return NextResponse.json(fallbackReviews);

  } catch (error) {
    console.error("Error fetching Google Reviews:", error);
    return NextResponse.json(fallbackReviews);
  }
}
