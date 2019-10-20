import * as string from './string';

export const isEmpty = (item) => {
    if (item === undefined || item === null) {
        return true;
    }

    if (typeof item === 'string') {
        return string.isBlank(item);
    }

    if (Array.isArray(item)) {
        return item.length === 0;
    }

    if (typeof item === 'object') {
        return Object.entries(item).length === 0;
    }

    return true;
};

export const random = (max: number, min?: number) => {
    if (min !== undefined) {
        return min + Math.floor(Math.random() * max - min);
    }
    return Math.floor(Math.random() * max);
};

export const removeDuplicatesByKey = (arr, key) => {
    return arr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
    });
};

export const byDate = (a, b) => {
    if (a && a.date && b && b.date) {
        // @ts-ignore;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
};

export const byId = (a, b) => {
    if (a && b && a.id && b.id) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
    }
    return 0;
};

export const byLabel = (a, b) => {
    if (a && b) {
        const labelA = a.value.toUpperCase();
        const labelB = b.value.toUpperCase();
        if (labelA < labelB) {
            return -1;
        }
        if (labelA > labelB) {
            return 1;
        }
    }

    return 0;
};

export const isInList = (list, item, property) => {
    return list.find(it => it && it[property] === item[property]);
};
