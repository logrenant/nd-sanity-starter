import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const textWithParagraph = defineType({
  name: 'textWithParagraph',
  title: 'Text with Paragraph',
  type: 'document',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reverseDirection',
      title: 'Reverse Direction',
      type: 'boolean',
      description: 'If enabled, the title will be on the right and paragraph on the left.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Text Section',
        subtitle: 'Text with Paragraph',
      }
    },
  },
})
