import {defineType, defineField, defineArrayMember} from 'sanity'
import {ColorWheelIcon} from '@sanity/icons'

export const chessProfile = defineType({
  name: 'chessProfile',
  title: 'Chess',
  type: 'document',
  icon: ColorWheelIcon,
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({
      name: 'rating',
      title: 'Current rating',
      type: 'number',
      description: 'Your headline rating (e.g. blitz / rapid Elo).',
    }),
    defineField({
      name: 'accounts',
      title: 'Chess accounts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'account',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Chess.com', value: 'chesscom'},
                  {title: 'Lichess', value: 'lichess'},
                  {title: 'Other', value: 'other'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'username', type: 'string'}),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'username', subtitle: 'platform'},
          },
        }),
      ],
    }),
    defineField({
      name: 'favoriteOpenings',
      title: 'Favorite openings',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'opening',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'color',
              title: 'Played as',
              type: 'string',
              options: {
                list: [
                  {title: 'White', value: 'white'},
                  {title: 'Black', value: 'black'},
                  {title: 'Both', value: 'both'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'moves',
              title: 'Main line',
              type: 'string',
              description: 'e.g. 1.e4 c5 2.Nf3 d6',
            }),
            defineField({name: 'notes', type: 'text', rows: 2}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'color'},
          },
        }),
      ],
    }),
    defineField({
      name: 'tournamentsWon',
      title: 'Tournaments won',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tournament',
          fields: [
            defineField({
              name: 'name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'date', type: 'date'}),
            defineField({name: 'location', type: 'string'}),
            defineField({name: 'notes', type: 'text', rows: 2}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'date'},
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Chess'}
    },
  },
})
