import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText, type ModelMessage, type UIMessage } from "npm:ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.ts";

export function createResponsesCall(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  instructions: string,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(
    getLovableAiGatewayRunId(request),
  );
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: {
      "Lovable-API-Key": config.apiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(config.model),
    instructions,
    messages,
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "medium",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return {
    response: async (originalMessages: UIMessage[], corsHeaders: HeadersInit) => {
      const response = result.toUIMessageStreamResponse({
        originalMessages,
        sendReasoning: true,
        onError: (error) =>
          error instanceof Error
            ? error.message
            : "Jawaban tidak dapat dimuat. Silakan coba kembali.",
      });
      return withLovableAiGatewayRunIdHeader(
        response,
        runIdFetch,
        corsHeaders,
      );
    },
  };
}