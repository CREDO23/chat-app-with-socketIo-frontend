import {
    createSlice,
    PayloadAction,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import toast from '../../utils/toasty/index';
import type { Chat, ChatState, ChatResponse } from '../../types/chat';
import { Message } from '../../types/messages';

const initialState: ChatState = {
    loading: false,
    currentChat: null,
    chats: [],
};

export const getChats = createAsyncThunk<AxiosResponse, Chat>(
    'chats/getChats',
    async (id, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/chats`,
                params: {
                    id,
                },
            });
            return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            if (state.currentChat?.name == action.payload.chat) {
                state.currentChat.messages.push(action.payload);
            } else {
                state.chats?.forEach((chat) => {
                    if (chat.name == action.payload.chat) {
                        chat.messages.push(action.payload);
                    }
                });
            }
        },

        setCurrentChat: (state, action: PayloadAction<Chat>) => {
            state.currentChat = action.payload;
        },

        createChat: (state, action: PayloadAction<Chat>) => {
            state.currentChat = action.payload;
        },

    },
    extraReducers: (builer) => {
        builer.addCase(getChats.pending, (state) => {
            state.loading = true;
        });

        builer.addCase(
            getChats.fulfilled,
            (state, action: PayloadAction<AxiosResponse<ChatResponse>>) => {
                state.loading = false;
                state.chats = action.payload.data.data;
            },
        );

        builer.addCase(getChats.rejected, (state, action) => {
            state.loading = false;
            state.chats = null;
            toast.error(action.payload as string);
        });
    },
});

export default chatsSlice.reducer;
export const { addMessage, setCurrentChat, createChat } = chatsSlice.actions;
