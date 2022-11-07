import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import USER from '../../types/user';
import axios, { AxiosError, AxiosResponse } from 'axios';

type CurrentUser = {
    loading: boolean;
    user: USER | null;
    error: unknown;
};

const initialState: CurrentUser = {
    loading: false,
    user: null,
    error: null,
};

export const setCurrentUser = createAsyncThunk<AxiosResponse, USER>(
    'user/setUser',
    async (user, { rejectWithValue }) => {
        try {
            const result = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
                data: user,
            });
            return result;
        } catch (error:any) {
            return rejectWithValue(error.response.data.message);
        }
    },
);

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setCurrentUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(
            setCurrentUser.fulfilled,
            (state, action: PayloadAction<AxiosResponse<USER>>) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            },
        );

        builder.addCase(setCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload || {
                message: 'Something went wrong',
            };
        });
    },
});

export default currentUserSlice.reducer;
