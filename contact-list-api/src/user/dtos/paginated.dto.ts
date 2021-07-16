export class PaginatedDto<TData> {

    skip: number;
    take: number;
    criterias: string[];
    data: TData[];
}
