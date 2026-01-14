import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for this page',
      initialValue: 'Home Page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add, remove, and reorder sections on the homepage',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'videoBanner'},
            {type: 'hero'},
            {type: 'textWithParagraph'},
            {type: 'bentoGrid'},
            {type: 'perspectiveSection'},
            // Gelecekte ekleyeceğiniz diğer component'ler buraya eklenebilir
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Home Page',
        subtitle: 'Homepage configuration',
      }
    },
  },
})
