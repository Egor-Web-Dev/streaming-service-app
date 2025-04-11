import { IAlbum } from "./IAlbum";
import { IUser } from "./IUser";

export interface IArtist {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  albums: IAlbum[];
  likes: IUser[];
}
