export interface IBaseRepository {
  getAll<TModel>(endpoint: string): Promise<TModel[]>;
  getById<TModel>(endpoint: string, id: string): Promise<TModel>;
  create<TRequest, TModel>(endpoint: string, data: TRequest): Promise<TModel>;
  update<TRequest, TModel>(endpoint: string, id: string, data: Partial<TRequest>): Promise<TModel>;
  delete<TResponse>(endpoint: string, id: string): Promise<TResponse>;
  authenticate<TRequest, TModel>(endpoint: string, credentials: TRequest): Promise<TModel>;
} 