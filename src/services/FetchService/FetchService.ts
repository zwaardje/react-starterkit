import { FetchServiceInterface } from './FetchServiceInterface';
import { FetchData } from './FetchData';

export const mergeFetchOptions = (defaultOptions, fetchOptions = {}, headers = {}) => (
    { ...defaultOptions, ...fetchOptions, headers }
);

export const mergeHeaders = (defaultHeaders: Headers, extendHeaders: Headers) => {
    extendHeaders.forEach((value, key) => {
        if (value !== defaultHeaders.get(key)) {
            defaultHeaders.set(key, value);
        }
    });

    return defaultHeaders;
};

export class FetchService implements FetchServiceInterface {

    public async fetch(url: string, locale?: string, fetchOptions?: any): Promise<FetchData> {
        const defaultHeaders = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
        });

        if (locale) {
            defaultHeaders.set('X-Locale', locale);
        }

        const defaultOptions = {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include',
            cache: 'no-cache',
        };

        const absoluteUrl = url;

        const headers = fetchOptions && fetchOptions.headers ?
            mergeHeaders(defaultHeaders, new Headers(fetchOptions.headers)) :
            defaultHeaders;

        const options = mergeFetchOptions(defaultOptions, fetchOptions || {}, headers);

        try {
            const request = new Request(absoluteUrl, options);
            const response = await fetch(request);

            let data: object;

            if (response.status === 307 &&
               response.headers) {

                data = {
                    redirect: response.headers.get('location'),
                    status: response.status,
                    statusText: response.statusText,
                };

                return <FetchData>{
                    response,
                    data,
                    absoluteUrl,
                };
            }

            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText);

                // @ts-ignore
                error.response = response;

                throw error;
            }

            const contentType = response.headers && response.headers.get('Content-Type');

            if (typeof contentType === 'string' && (/json/).test(contentType)) {
                data = await response.json();
            } else {
                data = { text: await response.text() };
            }

            return <FetchData>{
                response,
                data,
                absoluteUrl,
            };
        } catch (error) {
            if (error.response) {
                if (error.response.headers && (/json/).test(error.response.headers.get('Content-Type'))) {
                    error.data = await error.response.json();
                } else {
                    error.data = await error.response.text();
                }
                console.log(`Failed calling ${ absoluteUrl }, status: ${ error.response.status}, ${ error.message }`);
            } else {
                console.log(`Failed calling ${ absoluteUrl }, ${ error.message }`);
            }

            return <FetchData> {
                absoluteUrl,
                error,
                response: error.response,
            };
        }
    }
}
