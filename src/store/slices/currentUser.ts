import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import USER from '../../types/user';
import axios, { AxiosResponse } from 'axios';
import type {
    SigninResponse,
    SingupResponse,
    CurrentUser,
} from '../../types/user';

const initialState: CurrentUser = {
    successMessage: '',
    loading: false,
    errorMessage: null,
    user: null,
    accessToken: localStorage.getItem('accessToken'),
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
                state.errorMessage = null;
                state.successMessage = action.payload.data.message;
                state.user = action.payload.data.data;
            },
        );

        builder.addCase(singup.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload || 'Something went wrong';
            state.successMessage = null;
            state.user = null;
        });

        builder.addCase(singin.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            singin.fulfilled,
            (state, action: PayloadAction<AxiosResponse<SigninResponse>>) => {
                state.loading = false;
                state.errorMessage = null;
                state.successMessage = action.payload.data.message;
                state.user = action.payload.data.data.user;
                state.accessToken = action.payload.data.data.accessToken;
                localStorage.setItem(
                    'accessToken',
                    action.payload.data.data.accessToken,
                );
            },
        );

        builder.addCase(singin.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload || 'Something went wrong';
            state.successMessage = null;
            state.user = null;
            state.accessToken = null;
        });
    },
});

export default currentUserSlice.reducer;
