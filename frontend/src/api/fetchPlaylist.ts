import { BASE_URL } from "./baseUrl";
import { IPlaylist } from "../interfaces/IPlaylist";

export async function fetchPlaylist(
  token: string,
  id: number,
): Promise<IPlaylist | void> {
  try {
    const response = await fetch(`${BASE_URL}/api/playlists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: IPlaylist = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
}
