import { BASE_URL } from "./baseUrl";
import { IPlaylistsDto } from "../interfaces/IPlaylistsDto";

export async function setPlaylist(
  token: string,
  name: IPlaylistsDto,
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/playlists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },

      body: JSON.stringify(name),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
  }
}
