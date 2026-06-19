import type {SanityImageSource} from '@sanity/image-url'

export type Chess = {
  rating: number | null
  accounts: {
    _key: string
    platform: 'chesscom' | 'lichess' | 'other'
    username: string | null
    url: string | null
  }[] | null
  favoriteOpenings: {
    _key: string
    name: string
    color: 'white' | 'black' | 'both' | null
    moves: string | null
    notes: string | null
    photo: SanityImageSource | null
  }[] | null
  tournamentsWon: {
    _key: string
    name: string
    date: string | null
    location: string | null
    notes: string | null
  }[] | null
} | null

export type Game = {
  _id: string
  title: string
  slug: string | null
  status: 'playing' | 'completed' | 'wishlist'
  platform: string | null
  rating: number | null
  records: string | null
  notes: string | null
  photo: SanityImageSource | null
}

export type Manga = {
  _id: string
  title: string
  slug: string | null
  status: 'reading' | 'completed' | 'wishlist'
  author: string | null
  rating: number | null
  progress: string | null
  thoughts: string | null
  cover: SanityImageSource | null
}

export type Figurine = {
  _id: string
  name: string
  slug: string | null
  status: 'painted' | 'owned' | 'wishlist'
  faction: string | null
  notes: string | null
  photo: SanityImageSource | null
}

export type Strategy = {
  _id: string
  title: string
  slug: string | null
  faction: string | null
  body: string
}
