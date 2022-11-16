import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import toast from '../../utils/toasty/index';
import type {
    ChatState,
    GetChatResponse,
    AddChatResponse,
} from '../../types/chat';
import type Chat from '../../types/chat';
import Message from '../../types/messages';

const initialState: ChatState = {
    loading: false,
    currentChat: null,
    lastUpdate: new Date().toISOString(),
    chats: [],
};

export const getChats = createAsyncThunk<AxiosResponse, string>(
    'chats/getChats',
    async (id, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'GET',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/chats/${id}`,
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

export const newChat = createAsyncThunk<AxiosResponse, Chat>(
    'chat/new',
    async (chat, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/chats`,
                data: chat,
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

//update lastConnection of this user in the backend

//create the chat in thr backend

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setCurrentChat: (state, action: PayloadAction<string>) => {
            state.currentChat = state.chats.filter(
                (chat) => chat._id == action.payload,
            )[0];
        },
    },
    extraReducers: (builer) => {
        builer.addCase(getChats.pending, (state) => {
            state.loading = true;
        });

        builer.addCase(
            getChats.fulfilled,
            (state, action: PayloadAction<AxiosResponse<GetChatResponse>>) => {
                state.loading = false;
                state.chats = action.payload.data.data;
            },
        );

        builer.addCase(getChats.rejected, (state, action) => {
            state.loading = false;
            state.chats = [];
            toast.error(action.payload as string);
        });

        builer.addCase(newChat.pending, (state) => {
            state.loading = true;
        });

        builer.addCase(
            newChat.fulfilled,
            (state, action: PayloadAction<AxiosResponse<AddChatResponse>>) => {
                state.loading = false;
                state.chats.push(action.payload.data.data);
                state.currentChat = action.payload.data.data;
                state.lastUpdate = new Date().toISOString();
            },
        );

        builer.addCase(newChat.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.payload as string);
        });
    },
});

export default chatsSlice.reducer;
export const { setCurrentChat } = chatsSlice.actions;
