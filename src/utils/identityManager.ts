import { UserIdentity } from "@/domain/models/UserIdentity";
import { cookieStorageManager } from "./sessionStorage";

const storage_key = "user_identity";
const storage_options = { maxAge: 60 * 60 * 24 * 1 };

export const identityManager = {
  getUserIdentity: (): UserIdentity => cookieStorageManager.get(storage_key) || null,
  setUserIdentity: (identity: UserIdentity) => cookieStorageManager.set(storage_key, identity, storage_options),
  removeUserIdentity: () => cookieStorageManager.remove(storage_key),
};
