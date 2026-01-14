import {defineField, defineType} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'

export const bentoGrid = defineType({
  name: 'bentoGrid',
  title: 'Bento Grid',
  type: 'document',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'bentoItem',
          title: 'Item',
          fields: [
            defineField({
              name: 'layout',
              title: 'Layout Settings',
              type: 'object',
              fields: [
                defineField({
                  name: 'width',
                  title: 'Width',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Full Width (100%)', value: 'full' },
                      { title: 'Half Width (50%)', value: 'half' },
                      { title: 'One Third (33%)', value: 'third' },
                      { title: 'Two Thirds (66%)', value: 'two-thirds' },
                      { title: 'Quarter Width (25%)', value: 'quarter' }
                    ],
                    layout: 'radio'
                  },
                  initialValue: 'third',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'height',
                  title: 'Height',
                  type: 'string',
                  options: {
                    list: [
                       { title: 'Short', value: 'short' },
                       { title: 'Medium', value: 'medium' },
                       { title: 'Tall', value: 'tall' }
                    ],
                    layout: 'radio'
                  },
                  initialValue: 'medium',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'contentDirection',
                    title: 'Content Direction (Desktop)',
                    description: 'On mobile, this will always be vertically stacked.',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Vertical (Column)', value: 'column' },
                            { title: 'Horizontal (Row)', value: 'row' },
                            { title: 'Vertical Reverse', value: 'column-reverse' },
                            { title: 'Horizontal Reverse', value: 'row-reverse' }
                        ]
                    },
                    initialValue: 'column'
                }),
                defineField({
                    name: 'align',
                    title: 'Content Align / Justify',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Start / Top', value: 'start' },
                            { title: 'Center', value: 'center' },
                            { title: 'End / Bottom', value: 'end' },
                            { title: 'Space Between', value: 'between' }
                        ]
                    },
                    initialValue: 'start'
                })
              ],
              options: {
                collapsible: true,
                collapsed: false
              }
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'array',
              // Validation for max items removed to allow stacking
              of: [
                {
                  type: 'image',
                  name: 'image',
                  title: 'Image',
                  options: { hotspot: true },
                  fields: [
                    defineField({
                        name: 'isBackground',
                        title: 'Use as Background',
                        type: 'boolean',
                        initialValue: false,
                        description: 'If checked, this image will cover the entire background of the item.'
                    }),
                    defineField({
                        name: 'expand',
                        title: 'Expand to Fill',
                        type: 'boolean',
                        initialValue: true,
                        description: 'If unchecked, image will only take up its natural size/height.'
                    })
                  ]
                },
                {
                  type: 'object',
                  name: 'productGrid',
                  title: 'Product Grid',
                  fields: [
                    defineField({
                        name: 'expand',
                        title: 'Expand to Fill',
                        type: 'boolean',
                        initialValue: true,
                        description: 'If unchecked, grid will only take up necessary space.'
                    }),
                    defineField({
                      name: 'products',
                      title: 'Products',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'productLink',
                          fields: [
                            {
                              name: 'handle',
                              title: 'Product Handle',
                              type: 'string',
                              validation: (Rule) => Rule.required(),
                            }
                          ]
                        }
                      ],
                      validation: (Rule) => Rule.max(6),
                    })
                  ]
                },
                {
                  type: 'object',
                  name: 'richText',
                  title: 'Rich Text',
                  fields: [
                    defineField({
                        name: 'expand',
                        title: 'Expand to Fill',
                        type: 'boolean',
                        initialValue: true,
                        description: 'If unchecked, text container will only be as tall as the content.'
                    }),
                    defineField({
                      name: 'text',
                      title: 'Text',
                      type: 'array',
                      of: [{ type: 'block' }]
                    })
                  ]
                }
              ]
            })
          ],
          preview: {
            select: {
              layout: 'layout',
              content: 'content'
            },
            prepare(selection) {
                const {content, layout} = selection;
                const type = content && content[0] ? content[0]._type : 'Unknown';
                const width = layout?.width || '?';
                const height = layout?.height || '?';
                return {
                    title: `${type} (${width}, ${height})`,
                }
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
