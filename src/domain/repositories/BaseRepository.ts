export abstract class BaseRepository {
  private readonly apiClient: <T>(url: string, options: RequestInit) => Promise<T>;

  constructor(apiClient: <T>(url: string, options: RequestInit) => Promise<T>) {
    this.apiClient = apiClient;
  }

  async getAll<TModel>(endpoint: string): Promise<TModel[]> {
    return this.apiClient<TModel[]>(endpoint, { method: "GET" });
  }

  async getById<TModel>(endpoint: string, id: string): Promise<TModel> {
    return this.apiClient<TModel>(`${endpoint}/${id}`, { method: "GET" });
  }

  async create<TRequest, TModel>(endpoint: string, data: TRequest): Promise<TModel> {
    return this.apiClient<TModel>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async update<TRequest, TModel>(endpoint: string, id: string, data: Partial<TRequest>): Promise<TModel> {
    return this.apiClient<TModel>(`${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string, id: string): Promise<void> {
    await this.apiClient<void>(`${endpoint}/${id}`, { method: "DELETE" });
  }

  async authenticate<TRequest, TModel>(endpoint: string, credentials: TRequest): Promise<TModel> {
    return this.apiClient<TModel>(endpoint, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }
}
