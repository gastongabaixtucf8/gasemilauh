import {defineQuery} from 'next-sanity'

export const CHESS_QUERY = defineQuery(`
  *[_type == "chessProfile"][0]{
    rating,
    accounts[]{ _key, platform, username, url },
    favoriteOpenings[]{
      _key, name, color, moves, notes, photo,
      "photoAspect": photo.asset->metadata.dimensions.aspectRatio
    },
    tournamentsWon[]{ _key, name, date, location, notes }
  }
`)

export const GAMES_QUERY = defineQuery(`
  *[_type == "game"] | order(rating desc, title asc){
    _id, title, "slug": slug.current, status, platform, rating, hoursPlayed, records, notes,
    photo
  }
`)

export const MANGA_QUERY = defineQuery(`
  *[_type == "manga"] | order(rating desc, title asc){
    _id, title, "slug": slug.current, status, author, rating, progress, thoughts,
    cover
  }
`)

export const FIGURINES_QUERY = defineQuery(`
  *[_type == "figurine"] | order(faction asc, name asc){
    _id, name, "slug": slug.current, status, faction, notes,
    photo
  }
`)

export const STRATEGIES_QUERY = defineQuery(`
  *[_type == "strategy"] | order(faction asc, title asc){
    _id, title, "slug": slug.current, faction, body
  }
`)
