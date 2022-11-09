import type { DateParsed } from '../../types/dates';

const parseLength = (value: string): string => {
    let result;
    value.length == 1 ? (result = `0${value}`) : (result = `${value}`);
    return result;
};

export const parseDate = (date: Date): DateParsed => {
    const currentDay = new Date(Date.now()).getDate();
    const currentMonth = new Date(Date.now()).getMonth();
    const currentYear = new Date(Date.now()).getFullYear();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const hour = date.getHours().toString();
    const minute = date.getMinutes().toString();
    const second = date.getSeconds().toString();
    let day = '';

    if (
        currentYear == year &&
        currentMonth == month - 1 &&
        date.getDate() == currentDay
    ) {
        day = 'Today';
    } else {
        day = parseLength(date.getDate().toString());
    }

    return {
        year: parseLength(year.toString()),
        month: parseLength(month.toString()),
        day,
        hour: parseLength(hour.toString()),
        minute: parseLength(minute.toString()),
        second: parseLength(second.toString()),
    };
};

export const parseContent = (content: string): string => {
    return content.length > 12 ? `${content.substring(0, 12)} ...` : content;
};
