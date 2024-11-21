import { Message } from '@/types/chat';
import { OllamaModel } from '@/types/ollama';

import { OLLAMA_HOST } from '../app/const';

import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from 'eventsource-parser';

export class OllamaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OllamaError';
  }
}

export const OllamaStream = async (
  model: string,
  systemPrompt: string,
  temperature : number,
  prompt: string,
) => {
  let url = `${OLLAMA_HOST}/api/generate`;
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    method: 'POST',
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      system: "You are a customer support chatbot for Digi Bank. Your responses should be based solely on the provided information. You are a friendly and helpful customer support representative for Digi Bank. Only answer questions related to Digi Bank services, such as account management, loan information, credit card services, interest rates, online banking, and transaction issues. Do not discuss other financial institutions or services that are unrelated to Digi Bank. Do not answer questions about topics that are unrelated to Digi Bank or its offerings. Only use information provided in the knowledge base above. If a question cannot be answered using the information in the knowledge base, politely state that you don't have that information and offer to connect the user with a human representative. Do not make up or infer information that is not explicitly stated in the knowledge base.",
      options: {
        temperature: 0,
      },
      stream: false,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const result = await res.json();
    if (result.error) {
      throw new OllamaError(
        result.error
      );
    } 
  }

  const responseStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of res.body as any) {
          const text = decoder.decode(chunk); 
          const parsedData = JSON.parse(text); 
          if (parsedData.response) {
            controller.enqueue(encoder.encode(parsedData.response)); 
          }
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });
  
  return responseStream;
};