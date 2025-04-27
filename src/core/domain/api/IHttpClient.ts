import { UserIdentity } from "@/core/domain/entities/UserIdentity";

export interface IHttpClient {
  request: <T>(url: string, options?: RequestInit) => Promise<T>;
}

export type HttpClientFactory = (getUserIdentity: () => UserIdentity | null) => IHttpClient; 