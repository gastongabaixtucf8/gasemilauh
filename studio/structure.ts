import type {StructureResolver} from 'sanity/structure'
import {ColorWheelIcon, RocketIcon, BookIcon, StarIcon, BulbOutlineIcon} from '@sanity/icons'

// The Chess page is a single document (a "singleton"), not a list.
const CHESS_PROFILE_ID = 'chessProfile'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Chess')
        .icon(ColorWheelIcon)
        .child(
          S.document().schemaType('chessProfile').documentId(CHESS_PROFILE_ID),
        ),
      S.divider(),
      S.documentTypeListItem('game').title('Video Games').icon(RocketIcon),
      S.documentTypeListItem('manga').title('Manga').icon(BookIcon),
      S.divider(),
      S.listItem()
        .title('Warhammer')
        .icon(StarIcon)
        .child(
          S.list()
            .title('Warhammer')
            .items([
              S.documentTypeListItem('figurine').title('Figurines').icon(StarIcon),
              S.documentTypeListItem('strategy').title('Strategies').icon(BulbOutlineIcon),
            ]),
        ),
    ])
