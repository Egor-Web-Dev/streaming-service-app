import { BASE_URL } from "./baseUrl";
import { ILoginDto } from "src/interfaces/ILoginDto";

export async function login(user: ILoginDto): Promise<string | void> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    return data.access_token as string;
  } catch (error) {
    console.warn(error);
  }
}
