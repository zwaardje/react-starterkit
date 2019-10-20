import { call, put, race, take, delay } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18next from 'i18next/index.js';

import { FetchService } from '../services/FetchService/FetchService';
import Default from '../constants/default';
import * as http from '../helpers/http';
import { TYPES } from '../actions/notification.actions';
import API_STATUS, { isHandledError } from '../constants/apiStatus';

const fetchService = new FetchService();

const removeEmpty = (obj: { [x: string]: any; }) => {
    if (typeof obj !== 'object') {
        return obj;
    }
    return Object.keys(obj)
        .filter(k => obj[k] !== null && obj[k] !== undefined)  // Remove undef. and null.
        .reduce((newObj, k) =>
            typeof obj[k] === 'object' ?
                Array.isArray(obj[k]) ?
                    Object.assign(newObj, { [k]: obj[k].map(removeEmpty) }) :
                    Object.assign(newObj, { [k]: removeEmpty(obj[k]) }) :  // Recurse.
                Object.assign(newObj, { [k]: obj[k] }),  // Copy value.
                {});
};

function cleanResponse(response) {
    if (typeof response === 'object') {
        return removeEmpty(response);
    }
    return response;
}

export function* handleResponse(response) {

    const { data, error, response: responseObject } = response;

    if (!data && !responseObject) {
        Sentry.captureException(response.error);
        yield put({ type: TYPES.INVALID_REQUEST, message: i18next.t('errors:fetch:fatal'), status: 500 });

        return undefined;
    }

    if (http.isUnauthorized(responseObject)) {

        Sentry.captureException(error);
        yield put({ type: 'LOGOUT' });

    } else if (http.isError(response)) {

        Sentry.captureException(error);

    } else if (http.isLoginFailed(responseObject)) {
        const { data } = error;
        const result = cleanResponse(data);

        if (!isHandledError(result.status)) {
            yield put({ type: TYPES.INVALID_REQUEST, message: i18next.t('errors:login:fatal') });
        }
        return result;

    } else if (data && !error && http.isSuccess(responseObject) || http.isLoginFailed(responseObject)) {
        const result = cleanResponse(data);

        if (result.status !== API_STATUS.OK && !isHandledError(result.status)) {
            yield put({ type: TYPES.INVALID_REQUEST, message: result.errorMessage, status: result.status });
        }

        return result;
    }

    if (!responseObject && error) {
        Sentry.captureException(error);
        yield put({ type: 'LOGOUT' });
    }
}

export function* fetchData(endpoint: string, method: string = 'POST', parameters: any = {}) {

    const body = method === 'POST' ? {
        body: JSON.stringify(parameters),
    } : {};

    const response = yield call(
        fetchService.fetch,
        `${Default.ENDPOINT}${endpoint}`,
        '',
        {
            method,
            ...body,
        },
    );

    const data = yield call(handleResponse, response);
    if (data) {
        return data;
    }
}

function* pollWorker(interval, fn, args) {
    while (true) {
        try {
            yield delay(interval);
            yield call(fn, ...args);
        } catch (ex) {
            yield put({ type: TYPES.POLLING_FAILURE });
        }

    }
}

export function* poll(stopAction, interval, fn, ...args) {
    yield race([
        call(pollWorker, interval, fn, args),
        take(stopAction),
    ]);
}
