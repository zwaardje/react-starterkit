/* tslint:disable */
import BrowserCapabilities from './browser-capabilities';
import Default from '../constants/default';

import { debounce } from '../helpers/debounce';

let instance: any = null;
let _scrollAnimationPending = false;
let _resizeAnimationPending = false;

const _resizeHandlers = [];
const _scrollHandlers = [];
const _orientationChangeHandlers = [];

interface ScreenSizesInterface {
    mobile: boolean;
    mobileXl: boolean;
    tablet: boolean;
    desktop: boolean;
    desktopHD: boolean;
}

function scrollHandler(viewPortUtility) {
    if (!_scrollAnimationPending) {
        _scrollAnimationPending = true;

        window.requestAnimationFrame(() => {
            viewPortUtility.updateScrollState();
            _scrollHandlers.forEach((h: any) => h());
            _scrollAnimationPending = false;
        });
    }
}

function resizeHandler(viewPortUtility) {

    if (!_resizeAnimationPending) {
        _resizeAnimationPending = true;

        window.requestAnimationFrame(() => {
            viewPortUtility.updateScreenDimensions();
            _resizeHandlers.forEach((h: any) => h());
            _resizeAnimationPending = false;
        });
    }
}

function orientationChangeHandler() {
    window.requestAnimationFrame(() => {
        _orientationChangeHandlers.forEach((h: any) => h());
    });
}

function documentLoadedHandler(viewPortUtility) {
    viewPortUtility.updateScrollState();
    viewPortUtility.updateScreenDimensions();
}

class ViewportUtility {
    constructor() {
        if (instance !== null) {
            return instance;
        }

        instance = this;


        if (typeof window !== 'object') {
            return this.instance;
        }

        this._attachEventListeners();
        this.updateScrollState();
        this.updateScreenDimensions();

        return instance;
    }

    instance;

    resizing: boolean = false;

    screenWidth: number = 0;
    screenHeight: number  = 0;

    scrollDirection: string | null  = null;
    scrollOffsetStart: number = 0;
    scrollOffset: number = 0;

    scrollX: number = 0;
    scrollY: number = 0;

    _attachEventListeners() {
        const wait: number = 1000 / 60; // 60 fps


        document.addEventListener('scroll', debounce(wait, () => {
            scrollHandler(this);
        }));

        if (BrowserCapabilities.supportsTouch) {
            document.addEventListener('touchmove', debounce(wait, () => {
                scrollHandler(this);
            }));
        }

        document.addEventListener('DOMContentLoaded', () => {
            documentLoadedHandler(this);
        });

        window.addEventListener('resize', () => {
            this.resizing = true;
        });

        window.addEventListener('resize', debounce(wait, () => {
            this.resizing = false;
            resizeHandler(this);
        }));

        window.addEventListener('orientationchange', () => {
            orientationChangeHandler();
        });
    }

    updateScrollState() {
        let y = window.pageYOffset;
        const x = window.pageXOffset,
            maxScrollY = this.documentHeight - this.screenHeight;
        let direction = this.scrollDirection;

        if (y > maxScrollY) {
            y = maxScrollY;
        }
        if (y > this.scrollY) {
            direction = 'down';
        } else if (y < this.scrollY) {
            direction = 'up';
        }

        if (this.scrollDirection !== direction) {
            this.scrollOffsetStart = y;
        }
        this.scrollOffset = y - this.scrollOffsetStart;
        this.scrollDirection = direction;

        this.scrollX = x;
        this.scrollY = y;
    }

    calculateResize() {
        scrollHandler(this);
    }

    updateScreenDimensions() {
        const currentWindow = window;


        this.screenWidth = currentWindow.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        this.screenHeight = currentWindow.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
    }

    get isResizing() {
        return this.resizing;
    }

    get top() {
        return this.scrollY <= 0;
    }

    get documentHeight() {
        if (typeof window !== 'undefined') {
            return Math.max(document.body.scrollHeight, document.body.offsetHeight);
        }

        return 0;
    }

    get isMobile(): boolean {
        return this.screenWidth <= Default.breakpoints.mobile.max;
    }

    get isMobileXl(): boolean {
        return this.screenWidth <= Default.breakpoints.mobileXl.max;
    }

    get isTablet(): boolean {
        return this.screenWidth <= Default.breakpoints.tablet.max;
    }

    get isDesktop(): boolean {
        return this.screenWidth <= Default.breakpoints.desktop.max;
    }

    get isDesktopHD(): boolean {
       return this.screenWidth <= Default.breakpoints.desktopHd.max;
    }

    get screenSize() {
        const sizes = [
            {type: 'mobile', size: this.isMobile},
            {type: 'mobileXl', size: this.isMobileXl },
            {type: 'tablet', size: this.isTablet },
            {type: 'desktop', size: this.isDesktop },
            {type: 'desktopHD', size: this.isDesktopHD },
        ]

        return sizes.find(({type, size}) => size === true )
    }

    addResizeHandler(handler) {
        // @ts-ignore
        _resizeHandlers.push(handler);
    }

    removeResizeHandler(handler) {
        // not using filter because _resizeHandler is a constant
        // @ts-ignore
        const index = _resizeHandlers.indexOf(handler);

        if (index < 0) {
            return;
        }
        _resizeHandlers.splice(index, 1);
    }

    triggerResize() {
        resizeHandler(this);
    }

    addScrollHandler(handler) {
        // @ts-ignore
        _scrollHandlers.push(handler);
    }

    removeScrollHandler(handler) {
        // not using filter because _scrollHandlers is a constant
        // @ts-ignore
        const index = _scrollHandlers.indexOf(handler);

        if (index < 0) {
            return;
        }
        _scrollHandlers.splice(index, 1);
    }

    addOrientationChangeHandler(handler) {
        // @ts-ignore
        _orientationChangeHandlers.push(handler);
    }

    removeOrientationChangeHandler(handler) {
        // not using filter because _scrollHandlers is a constant
        // @ts-ignore
        const index = _orientationChangeHandlers.indexOf(handler);

        if (index < 0) {
            return;
        }
        _orientationChangeHandlers.splice(index, 1);
    }
}

export default ViewportUtility;
