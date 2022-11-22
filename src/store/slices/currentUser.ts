import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import toast from '../../utils/toasty/index';
import USER from '../../types/user';
import axios, { AxiosResponse } from 'axios';
import type {
    SigninResponse,
    SingupResponse,
    CurrentUserState,
    UpdateResponse,
    UploadImg,
} from '../../types/user';

const initialState: CurrentUserState = {
    loading: false,
    user: JSON.parse(localStorage.getItem('user') as string),
    accessToken: JSON.parse(localStorage.getItem('accessToken') as string),
    avatarLoading: false,
};

export const singup = createAsyncThunk<AxiosResponse, USER>(
    'user/singup',
    async (user, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/users/singup`,
                data: user,
            });
            console.log(result);
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const singin = createAsyncThunk<AxiosResponse, USER>(
    'user/singin',
    async (user, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/users/singin`,
                data: user,
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const uploadImage = createAsyncThunk<AxiosResponse, FileList>(
    'user/uploadImage',
    async (file, { rejectWithValue }) => {
        try {
            const toMb = 1024 * 1024;
            if (!file[0]) {
                toast.error('No image provided');
            } else if (
                file[0].type === 'image/pjeg' ||
                file[0].type === 'image/png' ||
                file[0].type === 'image/jpg'
            ) {
                toast.error('Image type not supported');
            } else if (file[0].size / toMb > 1.5) {
                toast.error('Image must be less than 1.5MB');
            }
            const data = new FormData();

            data.append('file', file[0]);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'dyj1vowdv');

            const result: AxiosResponse = await axios({
                method: 'POST',
                url: 'https://api.cloudinary.com/v1_1/dyj1vowdv/image/upload',
                data,
            });

            return result;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = createAsyncThunk<AxiosResponse, any>(
    'user/update',
    async ({ id, body }, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'PUT',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`,
                data: body,
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(singup.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            singup.fulfilled,
            (state, action: PayloadAction<AxiosResponse<SingupResponse>>) => {
                state.loading = false;
                toast.susscess(action.payload.data.message);
                state.accessToken = action.payload.data.data.accessToken;
                state.user = action.payload.data.data.user;
                localStorage.setItem(
                    'accessToken',
                    JSON.stringify(action.payload?.data?.data?.accessToken),
                );
                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload?.data?.data?.user),
                );
            },
        );

        builder.addCase(singup.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.payload as string);
            state.user = null;
        });

        builder.addCase(singin.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            singin.fulfilled,
            (state, action: PayloadAction<AxiosResponse<SigninResponse>>) => {
                state.loading = false;
                state.user = action.payload.data.data.user;
                state.accessToken = action.payload?.data?.data?.accessToken;
                toast.susscess(action.payload.data.message);
                localStorage.setItem(
                    'accessToken',
                    JSON.stringify(action.payload?.data?.data?.accessToken),
                );
                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload?.data?.data?.user),
                );
            },
        );

        builder.addCase(singin.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.accessToken = null;
            toast.error(action.payload as string);
        });

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            updateUser.fulfilled,
            (state, action: PayloadAction<AxiosResponse<UpdateResponse>>) => {
                state.loading = false;
                state.user = action.payload.data.data;
                toast.susscess(action.payload.data.message);
                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload.data.data),
                );
            },
        );

        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.payload as string);
        });

        builder.addCase(uploadImage.pending, (state) => {
            state.avatarLoading = true;
        });

        builder.addCase(
            uploadImage.fulfilled,
            (state, action: PayloadAction<AxiosResponse<UploadImg>>) => {
                state.avatarLoading = false;
                console.log(action.payload.data)
                state.user.avatar = action.payload.data.secure_url;
            },
        );

        builder.addCase(uploadImage.rejected, (state, action) => {
            state.avatarLoading = false;
            toast.error(action.payload as string);
        });
    },
});

export default currentUserSlice.reducer;
