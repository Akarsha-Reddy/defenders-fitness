// src/app/api/community/route.ts
import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { mockLeaderboard, mockInstagramPosts } from '@/lib/data/community';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-15';

export async function GET() {
  try {
    if (projectId && dataset) {
      const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
      });

      // GROQ Query for both leaderboard and instagram in one go
      const query = `{
        "leaderboard": *[_type == "leaderboardEntry"] | order(checkIns desc)[0...5] {
          "id": _id,
          firstName,
          checkIns,
          goalBadge
        },
        "instagram": *[_type == "instagramPost"] | order(order asc)[0...6] {
          "id": _id,
          postUrl,
          "thumbnail": thumbnail.asset->url,
          likes
        }
      }`;

      const data = await client.fetch(query);
      
      // If Sanity returns valid arrays, override defaults
      const responsePayload = {
        leaderboard: data.leaderboard?.length > 0 ? data.leaderboard : mockLeaderboard,
        instagram: data.instagram?.length > 0 ? data.instagram : mockInstagramPosts,
      };

      return NextResponse.json(responsePayload);
    }

    // Default: return mock data for DEV
    return NextResponse.json({
      leaderboard: mockLeaderboard,
      instagram: mockInstagramPosts
    });

  } catch (error) {
    console.error("Error fetching community data:", error);
    // Silent fallback to mock data on error so UI doesn't break
    return NextResponse.json({
      leaderboard: mockLeaderboard,
      instagram: mockInstagramPosts
    });
  }
}
