import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import toast from '../../utils/toasty/index';
import axios, { AxiosResponse } from 'axios';
import type { UsersListResponse, UsersState } from '../../types/user';

const initialState: UsersState = {
    loading: false,
    total: 0,
    users: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUsers = createAsyncThunk<AxiosResponse, any>(
    'users/getAll',
    async (query, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'GET',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
                params: query,
                headers : {
                    Authorization:`Bearer ${JSON.parse(localStorage.getItem('accessToken') as string)}` 
                }
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builer) => {
        builer.addCase(getUsers.pending, (state) => {
            state.loading = true;
        });

        builer.addCase(
            getUsers.fulfilled,
            (
                state,
                action: PayloadAction<AxiosResponse<UsersListResponse>>,
            ) => {
                state.loading = false;
                state.users = action.payload.data.data;
            },
        );

        builer.addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.error.message as string);
        });
    },
});

export default usersSlice.reducer;
