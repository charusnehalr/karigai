export type TelemetryEvent = {
  name: string;
  attributes?: Record<string, string | number | boolean>;
};

export const toTelemetryLog = (event: TelemetryEvent): string =>
  JSON.stringify({
    at: new Date().toISOString(),
    name: event.name,
    attributes: event.attributes ?? {}
  });
