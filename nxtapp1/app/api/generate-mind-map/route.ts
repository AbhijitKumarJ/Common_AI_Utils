import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_YOUR_SITE_URL,
    "X-Title": process.env.NEXT_PUBLIC_YOUR_SITE_NAME,
  }
});

function parseTopics(content: string): string[] {
  return content.split('\n')
    .filter(line => line.trim().length > 0)
    .map(line => line.replace(/^\d+\.\s*/, '').trim());
}

function parseSubtopics(content: string): string[] {
  return content.split('\n')
    .filter(line => line.trim().length > 0 && line.startsWith('-'))
    .map(line => line.replace(/^-\s*/, '').trim());
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    // Step 1: Extract main topics
    const topicsCompletion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [{ role: "user", content: `Extract 3-5 main topics from this text, listing them as numbered points:\n\n${text}` }],
    });
    const topics = parseTopics(topicsCompletion.choices[0].message.content);

    // Step 2: Generate subtopics for each main topic
    const mindMap: Record<string, string[]> = { "Central Topic": ["Llama 3.1 Model Overview"] };
    for (const topic of topics) {
      const subtopicsCompletion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "user", content: `Generate 3-5 subtopics for the following topic, listing them with bullet points (-):\n\n${topic}` }],
      });
      const subtopics = parseSubtopics(subtopicsCompletion.choices[0].message.content);
      mindMap[topic] = subtopics;
    }

    return NextResponse.json(mindMap);
  } catch (error) {
    console.error('Error generating mind map:', error);
    return NextResponse.json({ error: 'Error generating mind map' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "This endpoint only supports POST requests for mind map generation." }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: "This endpoint only supports POST requests for mind map generation." }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: "This endpoint only supports POST requests for mind map generation." }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ message: "This endpoint only supports POST requests for mind map generation." }, { status: 405 });
}