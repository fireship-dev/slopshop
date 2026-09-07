import {
  listProviderKeyMetadata,
  readProviderKey,
  saveProviderKey,
} from "../lib/keyVault";

export async function upsertProviderKey(providerId: string, rawKey: string) {
  saveProviderKey(providerId, rawKey);

  return {
    ok: true,
    providerId,
  };
}

export async function getProviderKey(providerId: string) {
  return {
    providerId,
    key: readProviderKey(providerId),
  };
}

export async function listProviderKeys() {
  return listProviderKeyMetadata();
}
