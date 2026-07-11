'use server'
import { cookies } from "next/headers";
import { ProposeAppointmentFormType } from "../../_components/BookAppointmentModal/appointment.schema";

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
      method: "POST", 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data), 
      cache: "no-store",
    });

    let finalData = null;
    const textData = await resp.text();
    if (textData) {
      try {
        finalData = JSON.parse(textData);
      } catch {
        finalData = textData; 
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