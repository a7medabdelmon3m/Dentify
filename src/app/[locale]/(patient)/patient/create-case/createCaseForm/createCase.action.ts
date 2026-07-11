'use server'
import { cookies } from "next/headers";

export async function createCase(data: FormData) {
  const cookiesStore = await cookies();
  
  const token = cookiesStore.get("token")?.value || cookiesStore.get("tkn")?.value;

  try {
    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }

    const resp = await fetch("http://localhost:5123/api/Case", {
      method: "POST",
      body: data, 
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const textData = await resp.text();
    let finalData = {};
    if (textData) {
      try {
        finalData = JSON.parse(textData);
      } catch (e) {
        finalData = { message: textData };
      }
    }

    if (!resp.ok) {
      return {
        success: false,
        error: (finalData as any).errors || (finalData as any).title || "Something went wrong",
        status: resp.status,
      };
    }

    const caseId = (finalData as any)?.id ?? (finalData as any)?.caseId;
    if (caseId) {
      cookiesStore.set("caseId", String(caseId), {
        path: "/",
        httpOnly: true,
      });
    }

    return {
      success: true,
      data: finalData,
      status: resp.status,
    };
    

  } catch (error) {
    console.error("Error creating case:", error);

    return {
      success: false,
      error: "Network Error",
      status: 500,
    };
  }
}