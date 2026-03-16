// src/sanity/schemaTypes/leaderboardEntry.ts
export const leaderboardEntryType = {
  name: 'leaderboardEntry',
  title: 'Leaderboard Entry',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'checkIns',
      title: 'Check-ins This Month',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'goalBadge',
      title: 'Goal Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Weight Loss', value: 'Weight Loss' },
          { title: 'Muscle Gain', value: 'Muscle Gain' },
          { title: 'Marathon Prep', value: 'Marathon Prep' },
          { title: 'Consistency', value: 'Consistency' },
          { title: 'Strength', value: 'Strength' },
        ],
      },
    },
  ],
};
