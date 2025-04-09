import { IBook } from "./IBook";

interface IPaginatedBooks {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: IBook[];
}

export type { IPaginatedBooks };