import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API Key Configuration Error" }, { status: 500 });
  }
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Modern Fallback Logic: Try 2.5 Flash (User's preferred), then 1.5 Flash (Standard)
    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-pro"];
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting generation with model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        if (text) {
          console.log(`Generation successful with ${modelName}`);
          return NextResponse.json({ result: text });
        }
      } catch (err: any) {
        console.error(`Model ${modelName} failed:`, err.message);
        lastError = err;
        continue; // Try next model
      }
    }

    throw lastError || new Error("All models failed to generate content");

  } catch (error: any) {
    console.error("Gemini API Ultimate Failure:", error);
    return NextResponse.json({ 
      error: "Service temporarily unavailable. Please try again in a moment.",
      details: error.message 
    }, { status: 500 });
  }
}



