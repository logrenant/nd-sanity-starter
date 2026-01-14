import {defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Site Title',
      description: 'The title of your website',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Site Description',
      description: 'A brief description of your website',
      rows: 3,
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Site Logo',
      description: 'Your website logo',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description: 'Browser tab icon (recommended: 32x32px or 48x48px)',
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Default Social Share Image',
      description: 'Default image for social media sharing (recommended: 1200x630px)',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'fonts',
      type: 'array',
      title: 'Custom Fonts',
      description: 'Upload custom font files (TTF, OTF, WOFF, WOFF2)',
      of: [
        {
          type: 'object',
          title: 'Font',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Font Name',
              description: 'e.g., Inter, Roboto, Poppins',
              validation: (rule) => rule.required(),
            },
            {
              name: 'variableName',
              type: 'string',
              title: 'CSS Variable Name',
              description: 'e.g., font-primary, font-heading (will be prefixed with --)',
              validation: (rule) => rule.required(),
            },
            {
              name: 'weights',
              type: 'array',
              title: 'Font Weights',
              description: 'Upload font files for different weights',
              validation: (rule) => rule.required().min(1),
              of: [
                {
                  type: 'object',
                  title: 'Weight',
                  fields: [
                    {
                      name: 'weight',
                      type: 'string',
                      title: 'Font Weight',
                      description: 'Font weight value',
                      options: {
                        list: [
                          {title: 'Thin (100)', value: '100'},
                          {title: 'Extra Light (200)', value: '200'},
                          {title: 'Light (300)', value: '300'},
                          {title: 'Regular (400)', value: '400'},
                          {title: 'Medium (500)', value: '500'},
                          {title: 'Semi Bold (600)', value: '600'},
                          {title: 'Bold (700)', value: '700'},
                          {title: 'Extra Bold (800)', value: '800'},
                          {title: 'Black (900)', value: '900'},
                        ],
                      },
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'file',
                      type: 'file',
                      title: 'Font File',
                      description: 'Upload TTF, OTF, WOFF, or WOFF2 file',
                      options: {
                        accept: '.ttf,.otf,.woff,.woff2',
                      },
                      validation: (rule) => rule.required(),
                    },
                    {
                      name: 'style',
                      type: 'string',
                      title: 'Font Style',
                      options: {
                        list: [
                          {title: 'Normal', value: 'normal'},
                          {title: 'Italic', value: 'italic'},
                        ],
                      },
                      initialValue: 'normal',
                    },
                  ],
                  preview: {
                    select: {
                      weight: 'weight',
                      style: 'style',
                      file: 'file.asset.originalFilename',
                    },
                    prepare({weight, style, file}) {
                      return {
                        title: `Weight: ${weight}${style === 'italic' ? ' Italic' : ''}`,
                        subtitle: file || 'No file',
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              name: 'name',
              variableName: 'variableName',
              weights: 'weights',
            },
            prepare({name, variableName, weights}) {
              const weightCount = weights?.length || 0
              return {
                title: name,
                subtitle: `--${variableName} (${weightCount} weight${weightCount !== 1 ? 's' : ''})`,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})
