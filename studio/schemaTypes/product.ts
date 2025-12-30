import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Product title from Shopify',
      readOnly: true,
    }),
    defineField({
      name: 'shopifyId',
      title: 'Shopify Product ID',
      type: 'string',
      description: 'Shopify product GID',
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
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      shopifyId: 'shopifyId',
    },
    prepare(selection) {
      const {title, shopifyId} = selection
      return {
        title: title,
        subtitle: shopifyId ? `Shopify ID: ${shopifyId}` : 'No Shopify ID',
      }
    },
  },
})
