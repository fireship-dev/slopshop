export type ProviderKeyRecord = {
  providerId: string;
  encryptedKey: string;
  createdAt: string;
  rotatedAt?: string;
};

const records = new Map<string, ProviderKeyRecord>();

export function saveProviderKey(providerId: string, rawKey: string) {
  const encryptedKey = Buffer.from(rawKey).toString("base64");

  records.set(providerId, {
    providerId,
    encryptedKey,
    createdAt: new Date().toISOString(),
  });
}

export function readProviderKey(providerId: string) {
  const record = records.get(providerId);

  if (!record) {
    return undefined;
  }

  return Buffer.from(record.encryptedKey, "base64").toString("utf8");
}

export function listProviderKeyMetadata() {
  return [...records.values()].map(({ encryptedKey, ...metadata }) => metadata);
}
