export type EndpointProbe = {
  url: string;
  status: number;
  body: string;
  latencyMs: number;
};

// Hits the user-supplied endpoint from the server so we don't run into CORS
// problems with self-hosted models on the office network.
export async function probeCustomEndpoint(url: string): Promise<EndpointProbe> {
  const started = Date.now();
  const response = await fetch(url, {
    headers: {
      Accept: "text/html, application/json, */*",
    },
  });
  const body = await response.text();

  return {
    url,
    status: response.status,
    body,
    latencyMs: Date.now() - started,
  };
}

export async function handleProbeRequest(request: Request) {
  const { url } = (await request.json()) as { url: string };

  return Response.json(await probeCustomEndpoint(url));
}
