import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import i18next from 'i18next';

import { fetchData } from '../helpers/saga';

import { TYPES } from '../actions/init.actions';
import { CHANGE_LANGUAGE, INIT_LANGUAGE } from '../actions/language.actions';

import { OK } from '../constants/apiStatus';

export function* initializeLanguage() {
    i18next.changeLanguage('en');
}

export function* setLanguage() {}

export function* initApplication() {}

export function* restoreApplication() {
    yield call(initApplication);

}

export function* init() {
    yield takeLatest(TYPES.INIT_APPLICATION, initApplication);
    yield takeLatest(TYPES.RESTORE_APPLICATION, restoreApplication);
    yield takeLatest(CHANGE_LANGUAGE, setLanguage);
    yield takeLatest(INIT_LANGUAGE, initializeLanguage);
}

export default init;
