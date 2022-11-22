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
    avatarLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: USER | any;
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

type UploadImg = {
    secure_url: string;
};

export default USER;
export type {
    SigninResponse,
    SingupResponse,
    CurrentUserState,
    UpdateResponse,
    UsersListResponse,
    UsersState,
    UploadImg,
};
