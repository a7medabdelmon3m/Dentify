'use server'
import { cookies } from "next/headers";

// حدد الـ Base URL بتاع الباك إيند هنا مرة واحدة
const BASE_API_URL = "http://localhost:5123/api/";

// تعريف الـ Response Type لضمان الـ Type Safety في الكلاينت
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
    // 1. التحقق من التوكن (HCI: أمان أولي)
    if (!token) {
      return {
        success: false,
        error: "Unauthorized",
        status: 401,
      };
    }

    // 2. بناء الـ URL ديناميكياً
    // بنشيل أي سلاش زائدة في الأول وبنضيف الـ ID لو موجود
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    const urlId = id ? `/${id}` : "";
    const targetUrl = `${BASE_API_URL}${cleanEndpoint}${urlId}`;
    console.log('targetUrl : ' , targetUrl);
    

    console.log(`[API Call]: ${method} ${targetUrl}`); // للديجاجينج

    // 3. تجهيز خيارات الـ Fetch
    const fetchOptions: RequestInit = {
      method: method.toUpperCase(), // تأكيد إنها كابيتال
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // بنفترض إنه JSON بناءً على طلبك
      },
      cache: "no-store", // نضمن دايماً بيانات فريش
    };

    // 4. إضافة الـ Body لو موجود ومش GET
    if (body && !['GET', 'HEAD'].includes(method.toUpperCase())) {
      // ملحوظة: لو بتبعت FormData، لازم تشيل Content-Type header وتخلي الـ fetch يظبطها
      fetchOptions.body = JSON.stringify(body);
    }

    // 5. إجراء الطلب
    const resp = await fetch(targetUrl, fetchOptions);

    // 6. طريقة آمنة لقراءة الـ Response لتجنب الـ Crash
    let finalData = null;
    const textData = await resp.text();
    if (textData) {
      try {
        finalData = JSON.parse(textData);
      } catch {
        finalData = textData; // لو مش JSON خد النص كـ Text
      }
    }

    // 7. معالجة الأخطاء من السيرفر
    if (!resp.ok) {
      return {
        success: false,
        error: finalData?.errors || finalData?.message || "Something went wrong",
        status: resp.status,
      };
    }

    // 8. النجاح
    return {
      success: true,
      data: finalData,
      status: resp.status,
    };

  } catch (error) {
    // خطأ في الشبكة أو خطأ غير متوقع
    console.error(`[API Error] ${method} ${endpoint}:`, error);

    return {
      success: false,
      error: "Network Error",
      status: 500,
    };
  }
}