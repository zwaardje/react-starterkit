import { all, put, call, fork } from 'redux-saga/effects';
import i18next from 'i18next/index.js';
import * as Sentry from '@sentry/browser';

import init from './init';

function* onEachError(next, error, saga) {
    yield put({ type: 'ADD_MESSAGE', message: i18next.t('errors:saga:fatal', { name: saga.name }) });
    Sentry.captureException(error);
}

function* onFail(error, saga) {
    if (process.env.NODE_ENV !== 'production') {
        console.error(error);
        console.warn(`saga ${saga.name} will not be restarted anymore`);
    }

    yield put({ type: 'ADD_MESSAGE', message: i18next.t('errors:saga:fatal', { name: saga.name }) });
    Sentry.captureException(error);
}

const RESTART = '@@saga/RESTART';
const FAIL = '@@saga/FAIL';

function keepAlive(saga, options) {

    const {
        defaultBehavior = RESTART,
        disableWarnings = false,
        maxAttempts = 3,
        onEachError,
        onFail,
    } = options;

    let attempts = 0;
    let lastError = null;

    return function* restart(...args) {
        while (attempts < maxAttempts) {
            try {
                yield call(saga, ...args);
            } catch (error) {
                lastError = error;
                let shouldStop = false;
                if (typeof onEachError === 'function') {
                    let nextAction;
                    const getNextAction = (action) => { nextAction = action; };
                    yield call(onEachError, getNextAction, error, saga.name, attempts);
                    const result = nextAction || defaultBehavior;
                    shouldStop = result === FAIL;
                }
                if (shouldStop) {
                    break;
                }
                attempts += 1;
                if (process.env.NODE_ENV !== 'production') {
                    console.warn(disableWarnings, `Restarting ${saga.name} because of error`);
                }
            }
        }
        if (typeof onFail === 'function') {
            yield onFail(lastError, saga.name, attempts);
        } else if (!disableWarnings) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(disableWarnings, `Saga ${saga.name} failed after ${attempts}/${maxAttempts} attempts without any onFail handler`);
            }
        }
    };
}

export default function* saga() {
    const sagas = [
        init,
    ];

    yield all(sagas.map(saga => fork(saga)));
}
