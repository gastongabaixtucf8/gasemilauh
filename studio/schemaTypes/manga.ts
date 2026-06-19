import {defineType, defineField} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const manga = defineType({
  name: 'manga',
  title: 'Manga',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'reading',
      options: {
        list: [
          {title: 'Reading', value: 'reading'},
          {title: 'Completed', value: 'completed'},
          {title: 'Wishlist', value: 'wishlist'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author / mangaka',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'My rating (out of 10)',
      type: 'number',
      validation: (rule) => rule.min(0).max(10),
    }),
    defineField({
      name: 'progress',
      title: 'My progress',
      type: 'string',
      description: 'e.g. Volume 12 / 24, or "caught up"',
    }),
    defineField({
      name: 'thoughts',
      title: 'My thoughts',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'status', media: 'cover'},
  },
})
