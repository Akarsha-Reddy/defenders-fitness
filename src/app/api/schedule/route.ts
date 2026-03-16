import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { hardcodedSchedule } from '@/lib/data/schedule';

// Determine if we have Sanity configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-15';

export async function GET() {
  try {
    if (projectId && dataset) {
      // Connect to Sanity if env vars exist
      const client = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false, // get freshest data
      });

      // GROQ Query for classes
      const query = `*[_type == "class"] | order(time asc) {
        "id": _id,
        title,
        day,
        time,
        duration,
        category,
        "trainer": trainer-> {
          name,
          "image": image.asset->url
        },
        maxSpots,
        currentEnrollment
      }`;

      const classes = await client.fetch(query);
      
      // If Sanity has data, return it
      if (classes && classes.length > 0) {
        return NextResponse.json(classes);
      }
    }

    // Default: return hardcoded mock data for DEV
    return NextResponse.json(hardcodedSchedule);

  } catch (error) {
    console.error("Error fetching schedule:", error);
    // Silent fallback to mock data on error so UI doesn't break
    return NextResponse.json(hardcodedSchedule);
  }
}
