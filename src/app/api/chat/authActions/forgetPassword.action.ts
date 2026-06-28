"use server";

import { forgetPasswordType } from "@/app/[locale]/(auth)/patient/forget-password/page";
import { patientLoginType } from "@/app/[locale]/(auth)/patient/login/login.type";
import { studentLoginType } from "@/app/[locale]/(auth)/student/login/login.type";
import { cookies } from "next/headers";

export async function forgetPasswordAction(data :forgetPasswordType) {
  try {
    const res = await fetch(
      `http://localhost:5123/api/Authentication/forgetpassword`,
      {
        method: "post",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      },
    );

    if (!res.ok) {
      console.log("Register failed on backend, status:", res.status);
      return { status: false, data: "" };
    }

    const finalData = await res.json();
    console.log("finalData : ", finalData);
    if (finalData) {
      return { status: true, finalData};
    }
    return { status: false, data: "" };
  } catch (error) {
    console.log("error : ", error);
    return { status: false, data: "" };
  }
}
