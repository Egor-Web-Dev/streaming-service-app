import { BASE_URL } from "./baseUrl";
import { IRegisterDto } from "src/interfaces/IRegisterDto";

export async function register(user: IRegisterDto): Promise<string | void> {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
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
