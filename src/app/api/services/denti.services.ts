import { ApiResponse, patientCaseType, userProfileType } from "@/type";
import { NextApiResponse } from "next";
import { cookies } from "next/headers";




 export async function apiRequest<T>(
  url: string
): Promise<ApiResponse<T>> {

  const cookiesStore = await cookies();
  const token = cookiesStore.get("tkn")?.value;
 
  try {

    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }

    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    });

    const data = await resp.json();

    if (!resp.ok) {
      return {
        success: false,
        error: data.message,
        status: resp.status,
      };
    }

    return {
      success: true,
      data,
      status: resp.status,
    };

  } catch {

    return {
      success: false,
      error: "Network Error",
      status: 500,
    };
  }
}