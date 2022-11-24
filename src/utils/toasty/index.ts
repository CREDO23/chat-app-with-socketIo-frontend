import * as toastify from 'react-toastify';

const toast = {
    susscess: (message: string) =>
        toastify.toast.success(message, {
            autoClose: 2500,
        }),

    error: (message: string) =>
        toastify.toast.error(message, {
            autoClose: 2500,
        }),

    warning: (message: string) =>
        toastify.toast.warn(message, {
            autoClose: 2500,
        }),

    info: (message: string) =>
        toastify.toast.info(message, {
            autoClose: 2500,
        }),
};

export default toast;
