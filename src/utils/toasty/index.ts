import * as toastify from 'react-toastify';

const toast = {
    susscess: (message: string) => toastify.toast.success(message),

    error: (message: string) => toastify.toast.error(message),

    warning: (message: string) => toastify.toast.warn(message),

    info: (message: string) => toastify.toast.info(message),
};

export default toast;
