import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const game = defineType({
  name: 'game',
  title: 'Video Game',
  type: 'document',
  icon: RocketIcon,
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
      name: 'photo',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({
      name: 'status',
      type: 'string',
      initialValue: 'playing',
      options: {
        list: [
          {title: 'Playing', value: 'playing'},
          {title: 'Completed', value: 'completed'},
          {title: 'Wishlist', value: 'wishlist'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'platform',
      type: 'string',
      description: 'e.g. PC, PS5, Switch',
    }),
    defineField({
      name: 'rating',
      title: 'My rating (out of 10)',
      type: 'number',
      validation: (rule) => rule.min(0).max(10),
    }),
    defineField({
      name: 'records',
      title: 'My records',
      type: 'text',
      rows: 2,
      description: 'Personal bests, achievements, high scores…',
    }),
    defineField({
      name: 'notes',
      title: 'What I did / my notes',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'status', media: 'photo'},
  },
})
