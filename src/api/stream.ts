import { chooseProvider, type RouteRequest } from "../lib/modelRouter";

export type StreamChunk = {
  providerId: string;
  delta: string;
  done: boolean;
};

// TODO: real provider streaming. For now this fakes it by chunking the
// placeholder text so the UI work can start.
export async function* generateStream(request: RouteRequest): AsyncGenerator<StreamChunk> {
  const decision = chooseProvider(request);
  const text = `Slop streamed by ${decision.provider.name}`;
  const words = text.split(" ");

  for (const word of words) {
    // TODO: backpressure / abort signal
    await new Promise((resolve) => setTimeout(resolve, 40));
    yield { providerId: decision.provider.id, delta: `${word} `, done: false };
  }

  yield { providerId: decision.provider.id, delta: "", done: true };
}

export function toSSE(stream: AsyncGenerator<StreamChunk>) {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await stream.next();

      if (done) {
        controller.close();
        return;
      }

      // TODO: event ids so the client can resume after a disconnect
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(value)}\n\n`));
    },
    // TODO: cancel() should stop the underlying provider request
  });
}

// TODO: cost tracking for streamed responses. estimateCost needs the final
// token count and we don't have it until the stream ends.
