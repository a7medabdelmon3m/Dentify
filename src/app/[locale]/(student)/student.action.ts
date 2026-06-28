'use server'
import { cookies } from "next/headers";
import { ProposeAppointmentFormType } from "./student/appointment/appointment.schema";

// غيرنا الـ Type لـ any أو ممكن تحط الـ Interface بتاعك (ProposeAppointmentFormType)
export async function CreateAppointment(data: ProposeAppointmentFormType) {
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

    const resp = await fetch("http://localhost:5123/api/Appointments/Propose", {
      method: "POST", // يفضل تكون كابيتال
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // ضروري جداً عشان الباك إيند يفهم الـ JSON
      },
      body: JSON.stringify(data), // تحويل الأوبجكت لنص JSON
      cache: "no-store",
    });

    // طريقة آمنة لقراءة الـ Response عشان لو الباك إيند مرجعش داتا ميحصلش Crash
    let finalData = null;
    const textData = await resp.text();
    if (textData) {
      try {
        finalData = JSON.parse(textData);
      } catch {
        finalData = textData; // لو مرجعش JSON سليم، خده كـ Text عادي
      }
    }

    if (!resp.ok) {
      return {
        success: false,
        error: finalData?.errors || finalData?.message || "Something went wrong",
        status: resp.status,
      };
    }

    return {
      success: true,
      data: finalData,
      status: resp.status,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Network Error",
      status: 500,
    };
  }
}