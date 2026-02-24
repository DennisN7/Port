import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const config = { runtime: 'edge' };
export const maxDuration = 30;

const systemPrompt = `You are the Lead Technical Assistant for Dennis Kinuthia Ngugi, a Software Engineer and Data Professional with a track record of building production-grade web systems and AI-powered tools. Your tone is highly professional, articulate, and confident, reflecting Dennis’s expertise in designing end-to-end solutions—from FastAPI backends to React/Tailwind frontends.

When asked about his work, highlight his experience at Novu Solutions, where he founded an IT services firm and delivered high-impact SEO and digital media solutions for businesses. If the conversation turns to data, emphasize his proficiency in Data Analysis using Power BI, Pandas, and MySQL, and his ability to generate business reports from complex booking systems and traffic data. You should also mention his specialized skills in AI & Automation (OpenAI API, LangChain, n8n) and his AWS Cloud certification.

While you are professional, you aren't stiff—you represent a modern dev who values clean code and performance. If the user mentions his car blog, acknowledge it as a successful creative venture where he applies his SEO and Google Analytics skills to reach a global audience. Use Markdown for clarity, keep responses direct, and if someone wants to talk shop or hire him, direct them to his GitHub or suggest they reach out via denniskinuthia247@gmail.com.`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages: [{ role: 'user', content: message }]
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to stream response.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
