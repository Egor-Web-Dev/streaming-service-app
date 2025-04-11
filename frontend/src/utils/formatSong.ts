import { ISong } from "../interfaces/ISong";
import { ITrack } from "../interfaces/ITrack";
import { CustomTrack } from "./CustomTrack";
import { ApiPresenter } from "../api/ApiPresenter";

export function formatSong(song: ISong): ITrack {
  const currentUser = ApiPresenter.getInstance().getUser();
  const foundUser = song.likes.find((user) => user.id === currentUser.id);
  const isLike = !!foundUser;

  return new CustomTrack(song, isLike);
}
