import { createSlice , PayloadAction , createAsyncThunk  } from '@reduxjs/toolkit'
import USER from '../../types/user'
import axios from 'axios'

type CurrentUser = {
    loading: boolean,
    user: USER | null,
    error : unknown,
}

const initialState : CurrentUser = {
    loading: false,
    user: null,
    error : null
}


export const setCurrentUser = createAsyncThunk<USER , USER>('user/setUser',  (user) => {
    return axios({
        method : 'POST',
        url: `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        data : user
    })
})


export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setCurrentUser.pending, state => {
            state.loading = true;
        })

        builder.addCase(setCurrentUser.fulfilled, (state, action : PayloadAction<USER>) => {
            state.loading = false;
            state.user = action.payload
        })

        builder.addCase(setCurrentUser.rejected, (state, action) => { 
            state.loading = false;
            state.error = action.error || {message : 'Something went wrong'}
        }) 
    }
    
})

export default currentUserSlice.reducer

