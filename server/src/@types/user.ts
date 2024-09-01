export interface IUserList {
    options: {
        sort: Object,
        select: string,
        page: number,
        limit: number
    },
    query: Object
}