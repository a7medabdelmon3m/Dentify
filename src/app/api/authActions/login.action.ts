"use server";

import { patientLoginType } from "@/app/[locale]/(auth)/patient/login/login.type";
import { studentLoginType } from "@/app/[locale]/(auth)/student/login/login.type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(
  data: patientLoginType | studentLoginType,
  type: "patient" | "student",
) {
  try {
    const res = await fetch(`http://localhost:5123/api/Authentication/login`, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });
    // console.log('res:', res);
    if (!res.ok) {
      const errorText = await res.text();
      console.log("Backend Error:", res.status, errorText);
      return { status: false, data: "" };
    }

    const finalData = await res.json();
    console.log("finalData : ", finalData);

    if (finalData && finalData.token) {
      const myCookies = await cookies();
      myCookies.set("tkn", finalData.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      myCookies.set("userType", type, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return { status: true, data: finalData };
    }

    return { status: false, data: "" };
  } catch (error) {
    console.log("error : ", error);
    return { status: false, data: "" };
  }
}

export async function logoutAction() {
  const cookiesStore = await cookies();
  const userType = cookiesStore.get("userType")?.value;

  cookiesStore.delete("tkn");

  redirect(`/${userType}/login`);
}
