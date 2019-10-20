import { TYPES } from '../actions/language.actions';

const defaultState = {
    items: [
        {
            value: 'nl',
            label: 'NL',
            tag: 'nl_NL',
            active: true,
            currency: 'EUR',
        },
        {
            value: 'en',
            label: 'EN',
            tag: 'en_GB',
            active: false,
            currency: 'GBP',
        },
    ],
};

export const languages = (state = defaultState, action) => {
    switch (action.type) {
        case TYPES.INIT_LANGUAGE:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.tag === action.language) {
                        return {
                            ...item,
                            active: true,
                        };
                    }
                    return {
                        ...item,
                        active: false,
                    };
                }),
            };
        case TYPES.CHANGE_LANGUAGE:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.value === action.language) {
                        return {
                            ...item,
                            active: true,
                        };
                    }
                    return {
                        ...item,
                        active: false,
                    };
                }),
            };
        default:
            return state;
    }
};
