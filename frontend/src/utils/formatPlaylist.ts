import { CustomPlaylist } from "./CustomPlaylist";
import { IPlaylist } from "../interfaces/IPlaylist";
import { playlistsImages } from "../components/PlaylistsList";
import { ICustomPlaylist } from "../interfaces/ICustomPlaylist";

export function formatPlaylist(playlist: IPlaylist): ICustomPlaylist {
  const id = parseInt(playlist.id);
  const amountSong = playlist.songs.length;
  const path = `/playlist/${id}`;
  const images = playlistsImages[playlist.name];

  return new CustomPlaylist(id, playlist.name, amountSong, path, images);
}
