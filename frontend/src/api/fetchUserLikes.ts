import { BASE_URL } from "./baseUrl";
import { IUserLikesDto } from "../interfaces/IUserLikesDto";

export async function fetchUserLikes(
  token: string,
  username: string,
): Promise<IUserLikesDto | void> {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${username}/likes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: IUserLikesDto = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
}
