import { GoogleGenAI } from "@google/genai";
import { GenerateImageResponse, AspectRatio } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<GenerateImageResponse> => {
  try {
    const ai = getAIClient();
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        }
      },
    });

    return processResponse(response);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return { error: error.message || "An unexpected error occurred during generation." };
  }
};

export const restoreImage = async (base64Image: string, prompt: string): Promise<GenerateImageResponse> => {
  try {
    const ai = getAIClient();
    
    // Remove header if present (e.g., "data:image/png;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { 
             text: prompt 
          },
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG for simplicity or could detect
              data: cleanBase64
            }
          }
        ],
      },
      // When doing img2img/restoration, we typically don't force an aspect ratio 
      // as strictly as we do with generation, or we match the input. 
      // However, the API might generate a square by default if not specified.
      // We'll let the model decide based on input.
    });

    return processResponse(response);
  } catch (error: any) {
    console.error("Gemini API Error (Restore):", error);
    return { error: error.message || "An unexpected error occurred during restoration." };
  }
};

const processResponse = (response: any): GenerateImageResponse => {
  if (response.candidates && response.candidates.length > 0) {
    const content = response.candidates[0].content;
    if (content && content.parts) {
      for (const part of content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return { imageUrl: `data:${mimeType};base64,${base64Data}` };
        }
      }
    }
  }
  return { error: "No image was generated. Please try again." };
};
