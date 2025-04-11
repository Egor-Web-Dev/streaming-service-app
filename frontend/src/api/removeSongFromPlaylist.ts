import { BASE_URL } from "./baseUrl";

export async function removeSongFromPlaylist(
  token: string,
  songId: number,
  playlistId: number,
): Promise<void> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/playlists/${playlistId}/remove/${songId}`,
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
  } catch (error) {
    console.warn(error);
  }
}
