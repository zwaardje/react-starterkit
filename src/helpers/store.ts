import Default from '../constants/default';

const blacklist = [
    'router',
    'navigation',
];

export const filterState = (state, blacklist) => {
    return Object.keys(state)
        .filter(key => !blacklist.includes(key))
        .reduce((obj, key) => ({
            ...obj,
            [key]: state[key],
        }),     {});
};

export const saveState = (state, version) => {
    if (window.localStorage) {
        state.system.version = version;
        const filteredState = filterState(state, blacklist);
        const serializedState = JSON.stringify(filteredState);
        window.localStorage.setItem(Default.LOCAL_STORAGE_KEY, serializedState);
    }
};

export const loadState = (initialState, version) => {
    if (window.localStorage) {
        const serializedState = window.localStorage.getItem(Default.LOCAL_STORAGE_KEY);
        if (serializedState && serializedState !== 'undefined') {
            const state = JSON.parse(serializedState);

            if (state.system && state.system.version === version) {
                state.system.restored = true;
                return state;
            }
        }
    }
    return initialState;
};

export const deleteState = () => {
    if (window.localStorage) {
        window.localStorage.removeItem(Default.LOCAL_STORAGE_KEY);
    }
};
