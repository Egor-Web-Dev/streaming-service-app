import { IAlbum } from "./IAlbum";
import { IArtist } from "./IArtist";
import { ISong } from "./ISong";

export interface IUserLikesDto {
  artistLikes: IArtist[];
  albumLikes: IAlbum[];
  songLikes: ISong[];
}
