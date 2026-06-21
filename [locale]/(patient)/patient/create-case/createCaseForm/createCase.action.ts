'use server'
import { cookies } from "next/headers";
import { createCaseType } from "./CreateCaseForm";
import { redirect } from "next/navigation";

export async function createCase(data:FormData) {
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

    const resp = await fetch("http://localhost:5123/api/Case", {
      method: "post",
      body :data ,
      headers: {
        Authorization: `Bearer ${token}`,
      },

      cache: "no-store",
    });

    const finalData = await resp.json();

    if (!resp.ok) {
      return {
        success: false,
        error: finalData.errors || "Something went wrong",
        status: resp.status,
      };
    }
    const cookieStore = await cookies();
    const caseId = finalData?.id ?? finalData?.caseId;
    if (caseId) {
      cookieStore.set("caseId", String(caseId), {
        path: "/",
        httpOnly: true,
      });
    }
    return {
      success: true,
      data: finalData,
      status: resp.status,
    };
    redirect(`/patient/dashboard`);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Network Error",
      status: 500,
    };
  }
}