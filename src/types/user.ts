interface USER {
    userName: string;
    firstName?: string;
    lastName?: string;
    password: string;
    email?: string;
}

type CurrentUser = {
    successMessage: string | null;
    loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMessage: any;
    user: USER | null;
    accessToken: unknown;
};

type SigninResponse = {
    message: string;
    data: {
        accessToken: string;
        user: USER;
    };
};

type SingupResponse = {
    message: string;
    data: USER;
};

export default USER;
export type { SigninResponse, SingupResponse, CurrentUser };
