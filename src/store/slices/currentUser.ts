import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import USER from '../../types/user';
import axios, { AxiosResponse } from 'axios';

type CurrentUser = {
    loading: boolean;
    user: USER | null;
    accessToken : unknown
    error: unknown;
};

const initialState: CurrentUser = {
    loading: false,
    user: null,
    accessToken: localStorage.getItem('accessToken'),
    error: null,
};

type SigninResponse = {
    accessToken: string,
    user : USER
}

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
                url: `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
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
            (state, action: PayloadAction<AxiosResponse<USER>>) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            },
        );

        builder.addCase(singup.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload || {
                message: 'Something went wrong',
            };
        });

        builder.addCase(singin.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            singin.fulfilled,
            (state, action: PayloadAction<AxiosResponse<SigninResponse>>) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.accessToken = action.payload.data.accessToken
            },
        );

        builder.addCase(singin.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload || {
                message: 'Something went wrong',
            };
        });
    },
});

export default currentUserSlice.reducer;
