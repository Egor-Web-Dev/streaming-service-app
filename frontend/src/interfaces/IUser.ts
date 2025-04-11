import { IAlbum } from "./IAlbum";
import { IArtist } from "./IArtist";
import { IPlaylist } from "./IPlaylist";
import { ISong } from "./ISong";

export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  playlists: IPlaylist[];
  artistLikes: IArtist[];
  albumLikes: IAlbum[];
  songLikes: ISong[];
}
