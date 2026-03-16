export const classType = {
  name: 'class',
  title: 'Gym Class',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Class Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'day',
      title: 'Day of Week',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'Mon' },
          { title: 'Tuesday', value: 'Tue' },
          { title: 'Wednesday', value: 'Wed' },
          { title: 'Thursday', value: 'Thu' },
          { title: 'Friday', value: 'Fri' },
          { title: 'Saturday', value: 'Sat' },
          { title: 'Sunday', value: 'Sun' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'e.g. 06:00 AM',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'All' },
          { title: 'Strength', value: 'Strength' },
          { title: 'Cardio', value: 'Cardio' },
          { title: 'HIIT', value: 'HIIT' },
          { title: 'Boxing', value: 'Boxing' },
          { title: 'Yoga', value: 'Yoga' },
        ],
      },
    },
    {
      name: 'trainer',
      title: 'Trainer',
      type: 'reference',
      to: [{ type: 'trainer' }],
    },
    {
      name: 'maxSpots',
      title: 'Maximum Spots',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'currentEnrollment',
      title: 'Current Enrollment',
      type: 'number',
      initialValue: 0,
      validation: (Rule: any) => Rule.required().min(0),
    },
  ],
};
