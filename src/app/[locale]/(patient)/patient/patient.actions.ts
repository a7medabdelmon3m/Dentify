'use server'
import { cookies } from "next/headers";

const BASE_API_URL = "http://localhost:5123/api/";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string | unknown;
  status: number;
};

/**
 * دالة جوهرية لإجراء مكالمات الـ API من السيرفر (Server Action)
 * @param endpoint - المسار (مثلاً: "Appointments/Propose" أو "Cases")
 * @param method - طريقة الطلب (POST, PUT, GET, DELETE)
 * @param id - (اختياري) الـ ID لإضافته للـ URL
 * @param body - (اختياري) البيانات المراد إرسالها كـ JSON
 */
export async function dynamicApiAction<T = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "POST",
  id?: string | number,
  body?: unknown
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

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const urlId = id ? `/${id}` : "";
    const targetUrl = `${BASE_API_URL}${cleanEndpoint}${urlId}`;
    console.log('targetUrl : ' , targetUrl);
    

    console.log(`[API Call]: ${method} ${targetUrl}`); 

    const fetchOptions: RequestInit = {
      method: method.toUpperCase(), 
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      cache: "no-store", 
    };

    if (body && !['GET', 'HEAD'].includes(method.toUpperCase())) {
      fetchOptions.body = JSON.stringify(body);
    }

    const resp = await fetch(targetUrl, fetchOptions);

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
    console.error(`[API Error] ${method} ${endpoint}:`, error);

    return {
      success: false,
      error: "Network Error",
      status: 500,
    };
  }
}
export async function checkEmail(email: string) {
  try {
    const resp = await fetch(`http://localhost:5123/api/Authentication/emailexists?email=${encodeURIComponent(email)}`);
    
    if (!resp.ok) {
      return false; 
    }

    const result = await resp.text(); 
    return result === 'true'; 
    
  } catch (error) {
    console.error("Error checking email:", error);
    return false; 
  }
}