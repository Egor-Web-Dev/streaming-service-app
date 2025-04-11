import { fetchMe } from "./fetchMe";
import { login } from "../api/login";
import { likeSong } from "./likeSong";
import { fetchSong } from "./fetchSong";
import { register } from "../api/register";
import { fetchSongs } from "./fetchSongs";
import { ISong } from "../interfaces/ISong";
import { setPlaylist } from "./setPlaylist";
import { IUser } from "../interfaces/IUser";
import { fetchPlaylist } from "./fetchPlaylist";
import { fetchPlaylists } from "./fetchPlaylists";
import { fetchUserLikes } from "./fetchUserLikes";
import { IPlaylist } from "../interfaces/IPlaylist";
import { addSongToPlaylist } from "./addSongToPlaylist";
import { IRegisterDto } from "../interfaces/IRegisterDto";
import { removeSongFromPlaylist } from "./removeSongFromPlaylist";

const FAKE_USER: IRegisterDto = {
  username: "Born",
  password: "100",
  firstName: "Foma",
  lastName: "kiniaev",
};

const DEFAULT_PLAYLIST_NAMES = [
  "Плейлист #1",
  "Плейлист #2",
  "Плейлист #3",
  "Плейлист #4",
  "Плейлист #5",
  "Плейлист #6",
  "Плейлист #7",
];

export class ApiPresenter {
  private static _ApiPresenterInstance: ApiPresenter;
  private static _token: string;
  private static _user: IUser;

  private constructor() {}

  static async auth(): Promise<IUser> {
    if (!ApiPresenter._ApiPresenterInstance) {
      const token = await this.registerOrLogin();

      if (token) {
        const user = await this.fetchUser(token, FAKE_USER.username);
        const playlists = await fetchPlaylists(token);

        if (playlists && playlists.length === 0) {
          for await (const name of DEFAULT_PLAYLIST_NAMES) {
            await setPlaylist(token, { name });
          }
        }

        this._token = token;
        this._user = user!;

        this._ApiPresenterInstance = new ApiPresenter();
        return user!;
      }
    }

    return this._user;
  }

  static getInstance() {
    if (!ApiPresenter._ApiPresenterInstance) {
      console.warn("Please perform auth first");
    }

    return this._ApiPresenterInstance;
  }

  private static async registerOrLogin(): Promise<string | void> {
    const token = await login(FAKE_USER);
    if (token) return token;
    return await register(FAKE_USER);
  }

  private static async fetchUser(
    token: string,
    username: string,
  ): Promise<IUser | null> {
    const users = await fetchMe(token);
    return users?.find((user) => user.username === username) || null;
  }

  getUser(): IUser {
    return ApiPresenter._user;
  }

  async getPlaylist(playlistId: number): Promise<IPlaylist | void> {
    return await fetchPlaylist(ApiPresenter._token, playlistId);
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    return (await fetchPlaylists(ApiPresenter._token)) || [];
  }

  async getSongs(): Promise<ISong[]> {
    return (await fetchSongs(ApiPresenter._token)) || [];
  }

  async getSong(songId: number): Promise<ISong | void> {
    return await fetchSong(ApiPresenter._token, songId);
  }

  async likeSong(songId: number, isLike: boolean): Promise<ISong | void> {
    return await likeSong(ApiPresenter._token, songId, isLike);
  }

  async setPlaylist(name: string): Promise<void> {
    await setPlaylist(ApiPresenter._token, { name });
  }

  async addSongToPlaylist(
    songId: number,
    playlistId: number,
  ): Promise<IPlaylist | void> {
    return await addSongToPlaylist(ApiPresenter._token, songId, playlistId);
  }

  async removeSongFromPlaylist(
    songId: number,
    playlistId: number,
  ): Promise<void> {
    await removeSongFromPlaylist(ApiPresenter._token, songId, playlistId);
  }

  async getFavoriteSongs(): Promise<ISong[]> {
    const userLikes = await fetchUserLikes(
      ApiPresenter._token,
      ApiPresenter._user.username,
    );

    return userLikes?.songLikes || [];
  }
}
