export interface QueryRequest {
  limit: number;
  offset: number;
  [key: string]: any;
}

export interface CommonResponse<T> {
  message: string | null;
  data: T;
}
