import {defineType, defineField} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Collection title from Shopify',
      readOnly: true,
    }),
    defineField({
      name: 'shopifyId',
      title: 'Shopify Collection ID',
      type: 'string',
      description: 'Shopify collection GID',
      readOnly: true,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Custom description (overrides Shopify description)',
    }),
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEO Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'SEO Description',
          type: 'text',
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      shopifyId: 'shopifyId',
      media: 'image',
    },
    prepare(selection) {
      const {title, shopifyId, media} = selection
      return {
        title: title,
        subtitle: shopifyId ? `Shopify ID: ${shopifyId}` : 'No Shopify ID',
        media,
      }
    },
  },
})
