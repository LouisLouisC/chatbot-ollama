export const DEFAULT_SYSTEM_PROMPT =
  process.env.NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT ||
  "I am a customer service bot, email address is bot@bank.com, phone number is 212-555-5555";

export const OLLAMA_HOST =
  process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';

export const DEFAULT_TEMPERATURE = 
  parseFloat(process.env.NEXT_PUBLIC_DEFAULT_TEMPERATURE || "0");