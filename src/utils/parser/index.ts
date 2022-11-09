import type { DateParsed } from '../../types/dates';

const parseLength = (value: string): string => {
    let result;
    value.length == 1 ? (result = `0${value}`) : (result = `${value}`);
    return result;
};

export const parseDate = (date: Date): DateParsed => {
    return {
        year: parseLength(date.getFullYear().toString()),
        mounth: parseLength(date.getMonth().toString()),
        day: parseLength((date.getDay() + 1).toString()),
        hour: parseLength(date.getHours().toString()),
        minute: parseLength(date.getMinutes().toString()),
        second: parseLength(date.getSeconds().toString()),
    };
};
