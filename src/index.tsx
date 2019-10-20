import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as Sentry from '@sentry/browser';

import { I18nextProvider } from 'react-i18next';
import i18n, { config } from './i18next';

import App from './App';
import configureStore, { history } from './store';

import './style/index.scss';

declare global {
    interface Window {
        ga: any;
        dataLayer: any;
    }
}

// tslint:disable-next-line
const __svg__ = {
    path: './assets/icons/*.svg',
    name: 'assets/icons/iconset.svg',
};

if (process.env.SENTRY_DSN && process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.ENVIRONMENT,
        release: process.env.BUILD_SOURCEVERSION,
    });
}

history.listen((location) => {
    window.dataLayer.push({
        event: 'pageView',
        pagePath: location.pathname,
    });
});

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

const store = configureStore();

const loadApplication = async () => {
    await i18n.init(config);

    ReactDOM.render(
        <React.Suspense fallback={<p>Loading</p>}>
            <I18nextProvider i18n={i18n}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <App />
                    </ConnectedRouter>
                </Provider>
            </I18nextProvider>
        </React.Suspense>,
        document.getElementById('portal'));
};

loadApplication();
