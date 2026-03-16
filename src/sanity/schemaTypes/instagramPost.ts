// src/sanity/schemaTypes/instagramPost.ts
export const instagramPostType = {
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'document',
  fields: [
    {
      name: 'postUrl',
      title: 'Instagram Post URL',
      type: 'url',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'likes',
      title: 'Likes Count',
      type: 'number',
      initialValue: 0,
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
};
