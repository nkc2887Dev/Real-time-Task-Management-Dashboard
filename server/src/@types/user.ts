export interface IUserList {
  options: {
    sort: object;
    select: string;
    page: number;
    limit: number;
  };
  query: object;
}
