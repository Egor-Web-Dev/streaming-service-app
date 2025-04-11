import { BASE_URL } from "./baseUrl";
import { ISong } from "../interfaces/ISong";

export async function likeSong(
  token: string,
  songId: number,
  isLike: boolean,
): Promise<ISong | void> {
  const likeUnlike = isLike ? "like" : "unlike";

  try {
    const response = await fetch(
      `${BASE_URL}/api/songs/${songId}/${likeUnlike}`,
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

    const data: ISong = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
}
