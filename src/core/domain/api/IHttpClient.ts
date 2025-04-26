import { UserIdentity } from "@/core/domain/models/UserIdentity";

export interface IHttpClient {
  request: <T>(url: string, options?: RequestInit) => Promise<T>;
}

export type HttpClientFactory = (getUserIdentity: () => UserIdentity | null) => IHttpClient; 