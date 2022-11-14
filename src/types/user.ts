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
    data: {
        accessToken: string;
        user: USER;
    };
};

type UserChat = {
    id : string;
    userName : string;
    avatar : string;
    bio : string;
    email : string;
}

export default USER;
export type { SigninResponse, SingupResponse, CurrentUser , UserChat } ;
