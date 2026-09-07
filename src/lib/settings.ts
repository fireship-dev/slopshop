const STORAGE_KEY = "slopshop:settings";

export type Settings = {
  customEndpointUrl: string;
};

const defaults: Settings = {
  customEndpointUrl: "",
};

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export function saveSettings(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
