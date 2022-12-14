import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import toast from '../../utils/toasty/index';
import type {
    ChatState,
    GetChatResponse,
    AddChatResponse,
} from '../../types/chat';
import type Chat from '../../types/chat';
import type Message from '../../types/messages';

const initialState: ChatState = {
    loading: false,
    newMessageLoading: false,
    currentChat: null,
    newChat: null,
    chats: [],
    filteredChats: [],
};

export const getChats = createAsyncThunk<AxiosResponse, string>(
    'chats/getChats',
    async (id, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'GET',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/chats/${id}`,
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem('accessToken') as string,
                    )}`,
                },
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response.status == 401) {
                localStorage.clear();
                location.reload();
            }
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const newChat = createAsyncThunk<AxiosResponse, any>(
    'chat/new',
    async (chat, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/chats`,
                data: chat,
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem('accessToken') as string,
                    )}`,
                },
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response.status == 401) {
                localStorage.clear();
                location.reload();
            }
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const newMessage = createAsyncThunk<AxiosResponse, any>(
    'chat/newMessage',
    async ({ id, message }, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'PUT',
                url: `${import.meta.env.VITE_BACKEND_URL}/api/chats/${id}`,
                data: message,
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem('accessToken') as string,
                    )}`,
                },
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response.status == 401) {
                localStorage.clear();
                location.reload();
            }
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateLastView = createAsyncThunk<AxiosResponse, any>(
    'chat/updateLastView',
    async ({ userId, chatId }, { rejectWithValue }) => {
        try {
            const result: AxiosResponse = await axios({
                method: 'PUT',
                url: `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/chats/${chatId}/${userId}`,
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem('accessToken') as string,
                    )}`,
                },
            });
            return result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.response.status == 401) {
                localStorage.clear();
                location.reload();
            }
            return rejectWithValue(error?.response?.data?.message);
        }
    },
);

const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setCurrentChat: (state, action: PayloadAction<string | Chat>) => {
            if (typeof action.payload === 'string') {
                state.currentChat = state.chats.filter(
                    (chat) => chat._id == action.payload,
                )[0];
            } else {
                state.currentChat = action.payload;
            }
        },
        setNewChat: (state, action: PayloadAction<string | Chat>) => {
            state.newChat = action.payload as Chat;
        },

        newMsg: (state, action: PayloadAction<Chat>) => {
            const index = state.chats.findIndex(
                (chat) => chat.name == action.payload.name,
            );

            console.log(index);

            if (index >= 0) {
                state.chats.splice(index, 1);
                state.chats.unshift(action.payload);
            } else {
                state.chats.unshift(action.payload);
            }

            if (
                state.currentChat &&
                state.currentChat.name == action.payload.name
            ) {
                state.currentChat = action.payload;
            }
        },

        setNewMessage: (state, action: PayloadAction<Message>) => {
            state.newChat?.messages.push(action.payload);
        },

        searchChat: (state, action: PayloadAction<string>) => {
            state.filteredChats = state.chats.filter((chat) =>
                new RegExp(`${action.payload}`, 'ig').test(chat.name),
            );
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
            state.newMessageLoading = true;
        });

        builer.addCase(newChat.fulfilled, (state) => {
            state.newMessageLoading = false;
        });

        builer.addCase(newChat.rejected, (state, action) => {
            state.newMessageLoading = false;
            toast.error(action.payload as string);
        });

        builer.addCase(newMessage.pending, (state) => {
            state.newMessageLoading = true;
        });

        builer.addCase(
            newMessage.fulfilled,
            (state, action: PayloadAction<AxiosResponse<AddChatResponse>>) => {
                state.newMessageLoading = false;
                const index = state.chats.findIndex(
                    (chat) => chat._id == action.payload.data.data._id,
                );

                console.log(index);

                if (index >= 0) {
                    state.chats.splice(index, 1);
                    state.chats.unshift(action.payload.data.data);
                } else {
                    state.chats.unshift(action.payload.data.data);
                }
            },
        );

        builer.addCase(newMessage.rejected, (state, action) => {
            state.newMessageLoading = false;
            toast.error(action.payload as string);
        });
    },
});

export default chatsSlice.reducer;
export const { setCurrentChat, setNewChat, setNewMessage, newMsg, searchChat } =
    chatsSlice.actions;
