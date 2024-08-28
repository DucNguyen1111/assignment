export interface ApiResponse<T> {
  error_message: string;
  success: boolean;
  code?: string | number;
  message?: string;
  data: T;
}
