import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OllamaError, OllamaStream } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';


export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { model, system, options, prompt } = (await req.json()) as ChatBody;

    console.log("Code went past here")

    let promptToSend = system;
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT;
    }

    let temperatureToUse = options?.temperature;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }

    console.log("Error in Ollama stream")
    const stream = await OllamaStream (model, promptToSend, temperatureToUse, prompt);
    console.log("Response Stream is: ", stream )
    return new Response(stream);
  } catch (error) {
    if (error instanceof OllamaError) {
      // Log the actual error message returned from the Ollama host
      console.log("Ollama Error: ", error.message);

      const encoder = new TextEncoder();
      const responseMessage = `Error: ${error.message}`;

      const errorResponseStream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(responseMessage));
          controller.close();
        },
      });

      return new Response(errorResponseStream);
    } else {
      console.log("Unhandled Error: ", error);

      const encoder = new TextEncoder();
      const genericErrorMessage =
        'We are unable to process your request as it does not comply with our system policies. Please review the guidelines and try again.';

      const errorResponseStream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(genericErrorMessage));
          controller.close();
        },
      });

      return new Response(errorResponseStream);
    }

  }
};

export default handler;
