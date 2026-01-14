import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const videoBanner = defineType({
  name: 'videoBanner',
  title: 'Video Banner',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for identification',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Thumbnail image shown before video loads (16:9 aspect ratio recommended)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mobileVideo',
      title: 'Mobile Video (Optional)',
      type: 'file',
      description: 'Optimized video for mobile devices. If not provided, desktop video will be used.',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'overlayText',
      title: 'Overlay Text',
      type: 'string',
      description: 'Text to display over the video',
    }),
    defineField({
      name: 'overlaySubtext',
      title: 'Overlay Subtext',
      type: 'text',
      rows: 3,
      description: 'Additional text to display below the main text',
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
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically play video when loaded',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      title: 'Loop Video',
      type: 'boolean',
      description: 'Loop video continuously',
      initialValue: true,
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      description: 'Play video without sound (required for autoplay)',
      initialValue: true,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this video banner on the homepage',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      overlayText: 'overlayText',
      media: 'posterImage',
      isActive: 'isActive',
    },
    prepare(selection) {
      const {title, overlayText, media, isActive} = selection
      return {
        title: title,
        subtitle: isActive ? `✓ ${overlayText || 'Active'}` : overlayText || 'Inactive',
        media,
      }
    },
  },
})
