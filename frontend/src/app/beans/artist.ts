import {Song} from "./song";

export interface Artist {
  id: number,
  name: string,
  avatar: string,
  Songs: Song[] | undefined
}
