import type { DateParsed } from '../../types/dates';

const parseLength = (value: string): string => {
    let result;
    value.length == 1 ? (result = `0${value}`) : (result = `${value}`);
    return result;
};

export const parseDate = (date: string): DateParsed => {
    const currentDay = new Date(Date.now()).getDate();
    const currentMonth = new Date(Date.now()).getMonth();
    const currentYear = new Date(Date.now()).getFullYear();

    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const hour = new Date(date).getHours().toString();
    const minute = new Date(date).getMinutes().toString();
    const second = new Date(date).getSeconds().toString();
    let day = '';

    if (
        currentYear == year &&
        currentMonth == month - 1 &&
        new Date(date).getDate() == currentDay
    ) {
        day = 'Today';
    } else {
        day = parseLength(new Date(date).getDate().toString());
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

export const parseContent = (content: string, length: number): string => {
    return content.length > length
        ? `${content.substring(0, length)} ...`
        : content;
};
