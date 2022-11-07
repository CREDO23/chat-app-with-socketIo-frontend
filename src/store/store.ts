import { configureStore } from '@reduxjs/toolkit';
import currentUser from './slices/currentUser';

const store = configureStore({
    reducer: {
        currentUser,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
