import { BASE_URL } from "./baseUrl";
import { IPlaylist } from "../interfaces/IPlaylist";

export async function fetchPlaylists(
  token: string,
): Promise<IPlaylist[] | void> {
  try {
    const response = await fetch(`${BASE_URL}/api/users/playlists`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: IPlaylist[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
}
