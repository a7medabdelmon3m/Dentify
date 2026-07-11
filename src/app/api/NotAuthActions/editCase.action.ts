'use server'

import { cookies } from "next/headers";

export async function editCaseAction(id: string | number, formData: FormData) {
  try {
    const myCookies = await cookies();
    const token = myCookies.get('tkn')?.value;

    const res = await fetch(`http://localhost:5123/api/Case/${id}`, {
      method: 'PUT',
      body: formData, // بنبعت الـ FormData زي ما هي
      headers: {
        'Authorization': `Bearer ${token}`
        // ⚠️ مهم جداً: إياك تحط Content-Type هنا عشان الـ Fetch يحط الـ Boundary بنفسه
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.log("Backend Edit Error: ", errorText);
      return { success: false, error: errorText };
    }

    return { success: true };
  } catch (error) {
    console.error("Edit Catch Error:", error);
    return { success: false, error: "Network Error" };
  }
}