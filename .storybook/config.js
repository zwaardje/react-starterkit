import React from 'react';
import { addParameters, configure, addDecorator } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import '@storybook/addon-console';
import { addReadme } from 'storybook-readme';

import '../src/style/index.scss';

addDecorator(StoryRouter());
addDecorator(addReadme);

import { I18nextProvider } from 'react-i18next';
import i18n, { config } from '../src/i18next';

i18n.init(config)

addDecorator(story => 
    <I18nextProvider i18n={i18n}>
        { story () }
    </I18nextProvider>
);

addParameters({
    options: {
        isFullScreen: false,
        showNav: true,
        showPanel: false,
        panelPosition: 'bottom',
        sortStoriesByKind: false,
        hierarchySeparator: /\/|\./,
        hierarchyRootSeparator: /\|/,
        sidebarAnimations: true,
        enableShortcuts: true,
        isToolshown: true,
        theme: undefined,
        viewport: {
            defaultViewport: 'responsive',
        },
    },
});

const __svg__ = {
    path: '../src/assets/icons/*.svg',
    name: '/assets/icons/iconset.svg',
};
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);


const req = require.context('..', true, /\.story\.tsx?$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
