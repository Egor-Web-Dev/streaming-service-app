import { BASE_URL } from "./baseUrl";
import { IPlaylist } from "../interfaces/IPlaylist";

export async function addSongToPlaylist(
  token: string,
  songId: number,
  playlistId: number,
): Promise<IPlaylist | void> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/playlists/${playlistId}/add/${songId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: IPlaylist = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
}
