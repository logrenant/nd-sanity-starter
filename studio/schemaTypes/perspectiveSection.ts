import {defineType, defineField} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const perspectiveSection = defineType({
  name: 'perspectiveSection',
  title: 'Perspective Section',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Detail',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              description: 'Text to display on the button (e.g., "Shop Now", "Learn More")',
            }),
            defineField({
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
              description: 'URL or path for the button (e.g., "/products/handle" or "/collections/name")',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).warning('A perspective section usually looks best with at least 2 items.'),
    }),
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare({items}) {
      const firstItemTitle = items && items.length > 0 ? items[0].title : 'Perspective Section';
      return {
        title: firstItemTitle || 'Perspective Section',
        subtitle: items ? `${items.length} items` : 'No items',
        media: ImagesIcon,
      }
    },
  },
})
