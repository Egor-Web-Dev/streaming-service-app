import { ISong } from "./ISong";

export interface IPlaylist {
  id: string;
  name: string;
  songs: ISong[];
  images: string[];
  user?: string;
  createAt?: number;
}
