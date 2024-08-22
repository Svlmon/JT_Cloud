import {Artist} from "./artist";

export interface Album {
  id: number,
  title: string,
  cover_image: string,
  release_date: string,
  artist: Artist
}
