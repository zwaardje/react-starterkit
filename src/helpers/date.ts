import { format, parse, isValid, endOfDay } from 'date-fns';

export const DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm';
export const DATE_FORMAT = 'dd/MM/yyyy';
export const TIME_FORMAT = 'HH:mm';

export const NIGHT = 'night';
export const EVENING = 'evening';
export const AFTERNOON = 'afternoon';
export const MORNING = 'morning';

export const getDayPart = () => {
    const today = new Date();
    const hours = today.getHours();
    let dayPart = NIGHT;

    if (hours >= 17) {
        dayPart = EVENING;
    } else if (hours >= 12) {
        dayPart = AFTERNOON;
    } else if (hours >= 4) {
        dayPart = MORNING;
    }

    return dayPart;
};

export const getDateState = (state) => {
    if (!state && !state.bookings) return {};

    const { current } = state.bookings;
    return current.date;
};

export const formatDateTime = (date: Date | number, dateTimeFormat?: string) => {
    if (!isValid(date)) {
        return '';
    }
    return format(date, dateTimeFormat || DATE_TIME_FORMAT);
};

export const parseDateTime = (date: string, dateTimeFormat?: string) => {
    return parse(date, dateTimeFormat || DATE_TIME_FORMAT, new Date());
};

export const formatDate = (date: Date | number, dateFormat?: string) => {
    if (!isValid(date)) {
        return '';
    }
    return format(date, dateFormat || DATE_FORMAT);
};

export const parseDate = (date: string, dateFormat?: string) => {
    return parse(date, dateFormat || DATE_FORMAT, new Date());
};

export const formatTime = (date: Date | number, timeFormat?: string) => {
    if (!isValid(date)) {
        return '';
    }
    return format(date, timeFormat || TIME_FORMAT);
};

export const parseTime = (date: string, timeFormat?: string) => {
    return parse(date, timeFormat || TIME_FORMAT, new Date());
};

export const getFullDay = (date: string) => {
    const endOfDate = endOfDay(parseDateTime(date));
    return [date, formatDateTime(endOfDate)];
};
