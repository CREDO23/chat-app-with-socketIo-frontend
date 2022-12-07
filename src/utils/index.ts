import toast from './toasty';
import axios from 'axios';

export const handleLastView = async (chatId: string, userId: string) => {
    try {
        const result = await axios({
            method: 'PUT',
            url: `${
                import.meta.env.VITE_BACKEND_URL
            }/api/chats/${chatId}/${userId}/${new Date().toISOString()}`,
        });

        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error(error as string);
    }
};

export const checkPassword = (password: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (password.length < 5) {
            toast.info('Your password must be at least 5 characters');
            reject(false);
        } else {
            resolve(true);
        }
    });
};
