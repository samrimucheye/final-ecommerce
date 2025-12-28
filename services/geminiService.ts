
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface SourcedProduct extends Product {
  sources?: { uri: string; title: string }[];
}

export const sourceProductsFromCJ = async (query: string): Promise<SourcedProduct[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search CJ Dropshipping and current e-commerce trends for: "${query}". Identify 4 top-selling or trending products. For each, return a valid object with ID, name, description, market-competitive price, and category. Use high-quality Unsplash image URLs for visuals.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              price: { type: Type.NUMBER },
              category: { type: Type.STRING },
              image: { type: Type.STRING, description: "A high quality Unsplash image URL (e.g. https://images.unsplash.com/...) relevant to the product" }
            },
            required: ["id", "name", "description", "price", "category", "image"]
          }
        }
      }
    });

    // Extract grounding URLs as per requirements
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({ uri: chunk.web.uri, title: chunk.web.title }));

    const products = JSON.parse(response.text || '[]');
    return products.map((p: any) => ({
      ...p,
      rating: 4.2 + (Math.random() * 0.8),
      stock: Math.floor(Math.random() * 80) + 20,
      importedFrom: 'CJ',
      sources: sources.slice(0, 3) // Attach a few source links for verification
    }));
  } catch (error) {
    console.error("Error sourcing from CJ with Grounding:", error);
    return [];
  }
};
