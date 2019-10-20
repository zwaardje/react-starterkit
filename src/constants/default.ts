export default {
    ENDPOINT: process.env.ENDPOINT || 'http://localhost:8000/',
    LOCAL_STORAGE_KEY: 'project-local',
    locale: 'nl',
    localeTag: 'nl_NL',
    cookie:{
        COOKIE_KEY: 'project-cookie',
        COOKIE_SESSION_KEY: 'pr-session',
        COOKIE_SESSION_RESTORE_KEY: 'pr-restore',
        timeToLive: 5,
    },
    breakpoints: {
        mobile: {
            min: 0,
            max: 568,
        },
        mobileXl: {
            min: 569,
            max: 767,
        },
        tablet: {
            min: 768,
            max: 1024,
        },
        desktop: {
            min: 1025,
            max: 1200,
        },
        desktopHd: {
            min: 1201,
            max: Infinity,
        },
    },
};
