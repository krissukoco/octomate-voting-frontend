export type PaginatedResponse<T> = {
  list: T[];
  pagination: {
    page: number;
    size: number;
    last_page: number;
    total: number;
  }
}