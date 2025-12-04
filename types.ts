export interface GenerateImageResponse {
  imageUrl?: string;
  error?: string;
}

export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface GenerationConfig {
  prompt: string;
  aspectRatio: AspectRatio;
}

export type Language = 'zh' | 'en';
export type AppMode = 'generate' | 'watermark' | 'enhance';
