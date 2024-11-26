import { OLLAMA_HOST } from '../app/const';


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
  console.log("URL is: ", url)
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
      system: systemPrompt,
      options: {
        temperature: 0,
      },
      stream: false,
    }),
  });

  
  console.log("Response is: ", res)


  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const result = await res.json();
    console.log("LLM Response is: ", result)
    console.log("LLM Response Error is: ", result.message)
    if (result.message) {
      throw new OllamaError(
        result.message
      );
    } 
  }

  console.log("Request Status Code: ", res.status)
  console.log("Response: ", res)

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
        console.log("Error Message is here: ", e)
        controller.error(e);
      }
    },
  });
  

  return responseStream;
};