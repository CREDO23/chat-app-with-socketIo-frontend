interface USER {
    _id?: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    confirmPassword?: string;
    avatar?: string;
    email?: string;
    bio?: string;
    isLogged?: boolean;
}

type CurrentUserState = {
    loading: boolean;
    user: USER | null;
    accessToken: unknown;
};

type UsersState = {
    loading: boolean;
    total: number;
    users: USER[];
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

type UsersListResponse = {
    message: string;
    data: USER[];
};

type UpdateResponse = {
    message: string;
    data: USER;
};

export default USER;
export type {
    SigninResponse,
    SingupResponse,
    CurrentUserState,
    UpdateResponse,
    UsersListResponse,
    UsersState,
};
