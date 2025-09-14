import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  try {
    const { prompt } = await request.json();
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });
    const result = await model.generateContent(prompt);
    const apiResponse = await result.response;
    const text = apiResponse.text();
    response.status(200).json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    response.status(500).json({ error: 'Failed to generate content.' });
  }
}
