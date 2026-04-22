export interface ApiResponse<T = any> {
  message: string;
  statusCode: number;
  error: any | null;
  data: T | null;
}
