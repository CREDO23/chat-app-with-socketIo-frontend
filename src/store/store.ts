import { configureStore } from '@reduxjs/toolkit';
import currentUser from './slices/currentUser';
import chats from './slices/chats';

const store = configureStore({
    reducer: {
        currentUser,
        chats,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
