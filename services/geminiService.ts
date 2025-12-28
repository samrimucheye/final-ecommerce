
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const sourceProductsFromCJ = async (query: string): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search CJ Dropshipping for products matching: "${query}". Return 4 realistic products with IDs, names, descriptions, prices, and categories.`,
      config: {
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
              image: { type: Type.STRING, description: "A high quality unsplash image URL relevant to the product" }
            },
            required: ["id", "name", "description", "price", "category", "image"]
          }
        }
      }
    });

    const products = JSON.parse(response.text || '[]');
    return products.map((p: any) => ({
      ...p,
      rating: 4.0 + Math.random(),
      stock: Math.floor(Math.random() * 100) + 10,
      importedFrom: 'CJ'
    }));
  } catch (error) {
    console.error("Error sourcing from CJ:", error);
    return [];
  }
};
