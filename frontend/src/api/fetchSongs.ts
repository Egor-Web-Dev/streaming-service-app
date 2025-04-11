import { BASE_URL } from "./baseUrl";
import { ISong } from "../interfaces/ISong";

export async function fetchSongs(token: string): Promise<ISong[] | void> {
  try {
    const response = await fetch(`${BASE_URL}/api/songs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data: ISong[] = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
}
