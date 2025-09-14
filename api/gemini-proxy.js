import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(request, response) {
    // Only allow POST requests
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { prompt } = request.body;

        if (!prompt) {
            return response.status(400).json({ error: 'Prompt is required' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        response.status(200).json({ text });

    } catch (error) {
        console.error("Gemini API Error:", error.message);
        response.status(500).json({ error: 'Failed to generate content from Gemini API.' });
    }
}
