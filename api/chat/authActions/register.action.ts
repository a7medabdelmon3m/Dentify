'use server'

import { patientRegisterType } from "@/app/[locale]/(auth)/patient/register/register.type";
import { studentRegisterType } from "@/app/[locale]/(auth)/student/register/register.type";
import { cookies } from "next/headers";

export async function registerAction(data: patientRegisterType | studentRegisterType ,type:string) {
  
  
  try {
    const res = await fetch(`http://localhost:5123/api/Authentication/register/${type}`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    });

    if (!res.ok) {
      console.log('Register failed on backend, status:', res.status);
      return false;
    }

    const finalData = await res.json();
    console.log('finalData : ', finalData);

    if (finalData && finalData.token) {
      const myCookies = await cookies();
      myCookies.set('tkn', finalData.token, {
        httpOnly: true, // للأمان
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      myCookies.set('userType', type, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/',
      });
      
      return true;
    }

    return false;

  } catch (error) {
    console.log('error : ', error);
    return false;
  }
}