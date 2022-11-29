import validator from 'validator';
import USER from '../../types/user';

export const isFill = (form: USER ): Promise<void> => {
    return new Promise((resolve, reject) => {
        let countFieds = 0;

        for (const input of Object.values(form)) {
            console.log(input);
            if (validator.isEmpty(input)) {
                reject('Please , Fill in all required fields');
            } else {
                countFieds += 1;
            }

            if (countFieds == Object.values(form).length) {
                resolve();
            }
        }
    });
};

export const isMatch = (arg1: string, arg2: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (arg1 === arg2) {
            resolve();
        } else {
            reject('Passowrd does not match');
        }
    });
};

