import {defineType, defineField} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const strategy = defineType({
  name: 'strategy',
  title: 'Strategy',
  type: 'document',
  icon: BulbOutlineIcon,
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
      name: 'faction',
      title: 'Faction / army',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'The strategy',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'faction'},
  },
})
