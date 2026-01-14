import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Custom URL', value: 'custom'},
          {title: 'Home', value: 'home'},
          {title: 'About Us', value: 'about'},
          {title: 'Blog', value: 'blog'},
          {title: 'All Items (Products)', value: 'allProducts'},
          {title: 'All Collections', value: 'collections'},
          {title: 'Specific Collection', value: 'collection'},
          {title: 'FAQ Page', value: 'faq'},
        ],
        layout: 'radio',
      },
      initialValue: 'custom',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'custom',
    }),
    defineField({
      name: 'collectionHandle',
      title: 'Collection Handle',
      type: 'string',
      description: 'e.g. "new-arrivals"',
      hidden: ({parent}) => parent?.type !== 'collection',
    }),
  ],
})
