import { FetchData } from './FetchData';

export interface FetchServiceInterface {
    fetch(url: string, locale?: string, fetchOptions?: object): Promise<FetchData>;
}
