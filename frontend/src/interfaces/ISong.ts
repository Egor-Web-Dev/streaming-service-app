import { IAlbum } from "./IAlbum";
import { IArtist } from "./IArtist";
import { IPlaylist } from "./IPlaylist";
import { IUser } from "./IUser";

export interface ISong {
  id: number;
  name: string;
  filename: string;
  path: string;
  image: string;
  duration: number;
  createdAt: string;
  album: IAlbum;
  artist: IArtist;
  playlists: IPlaylist[];
  likes: IUser[];
}
