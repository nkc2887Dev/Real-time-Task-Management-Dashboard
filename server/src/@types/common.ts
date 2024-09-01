interface Paginator {
  itemCount: number;
  perPage: number;
  pageCount: number;
  currentPage: number;
  slNo: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prev: number | null;
  next: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  paginator: Paginator;
}
