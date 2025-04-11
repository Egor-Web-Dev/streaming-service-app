import { BASE_URL } from "./baseUrl";
import { IUser } from "src/interfaces/IUser";

export async function fetchMe(token: string): Promise<IUser[] | void> {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data: IUser[] = await response.json();
      return data;
    }
  } catch (error) {
    console.warn(error);
  }
}
