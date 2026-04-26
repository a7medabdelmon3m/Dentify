// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // الإصدار السريع والمجاني

    // "System Prompt" عشان نخليه يتصرف كمساعد طبي لمشروعك
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "أنت مساعد ذكي في منصة لربط طلاب طب الأسنان بالمرضى. ردك يكون ودود وباللهجة المصرية." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    return NextResponse.json({ error: "حصلت مشكلة في الربط" }, { status: 500 });
  }
}