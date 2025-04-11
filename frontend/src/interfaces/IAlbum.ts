import { IArtist } from "./IArtist";
import { ISong } from "./ISong";
import { IUser } from "./IUser";

export interface IAlbum {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  songs: ISong[];
  artist: IArtist;
  likes: IUser[];
}
