interface USER {
    userName: string;
    firstName?: string;
    lastName?: string;
    password: string;
    confirmPassword?: string;
    email?: string;
}

type CurrentUser = {
    loading: boolean;
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
