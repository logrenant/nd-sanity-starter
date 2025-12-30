import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'URL or path (e.g., /collections/all)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this hero on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, subtitle, media, isActive} = selection
      return {
        title: title,
        subtitle: isActive ? `✓ ${subtitle || 'Active'}` : subtitle || 'Inactive',
        media,
      }
    },
  },
})
