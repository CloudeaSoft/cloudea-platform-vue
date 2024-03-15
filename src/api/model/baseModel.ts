export interface PageResponse<T> {
    total: number;
    rows: T[];
}