import validator from 'validator';
import USER from '../../types/user';

export const isFill = (form: USER): Promise<boolean | string> => {
    return new Promise((reject, resolve) => {
        let fieldsLength = 0;
        for (const input of Object.values(form)) {
            if (validator.isEmpty(input)) {
                reject(false);
            } else {
                fieldsLength += 1;
            }
            if (Object.values(form).length == fieldsLength) {
                resolve();
            }
        }
    });
};
