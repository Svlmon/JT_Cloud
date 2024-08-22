import {Gender} from "./gender";

export interface Song {
  id: number,
  title: string,
  duration: number,
  artist_id: number | undefined,
  gender_id: number,
  album_id: number,
  gender: Gender | undefined
}
