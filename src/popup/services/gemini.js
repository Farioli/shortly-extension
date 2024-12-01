
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiServices {

    static async generateRecap(videoTranscript, apiKey) {

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Given the following transcript, generate a short summary of the content: \n${videoTranscript}\n\n Summary:`;

        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}