import {defineType, defineField} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const figurine = defineType({
  name: 'figurine',
  title: 'Figurine',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
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
      initialValue: 'painted',
      options: {
        list: [
          {title: 'Painted', value: 'painted'},
          {title: 'Owned (unpainted)', value: 'owned'},
          {title: 'Wishlist', value: 'wishlist'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'faction',
      title: 'Faction / army',
      type: 'string',
      description: 'e.g. Space Marines, Necrons, Orks',
    }),
    defineField({
      name: 'notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'faction', media: 'photo'},
  },
})
