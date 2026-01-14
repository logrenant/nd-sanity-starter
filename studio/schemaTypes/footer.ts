import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'usefulLinks',
      title: 'Useful Links Group',
      type: 'object',
      fields: [
        defineField({
          name: 'groupTitle',
          title: 'Group Title',
          type: 'string',
          initialValue: 'Useful Links',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{type: 'link'}],
        }),
      ],
    }),
    defineField({
      name: 'support',
      title: 'Support Group',
      type: 'object',
      fields: [
        defineField({
          name: 'groupTitle',
          title: 'Group Title',
          type: 'string',
          initialValue: 'Support',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [{type: 'link'}],
        }),
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Subscribe to our newsletter',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'placeholder',
          title: 'Input Placeholder',
          type: 'string',
          initialValue: 'Enter your email',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Settings',
      }
    },
  },
})
