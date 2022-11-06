import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl : import.meta.env.VITE_BACKEND_URL
    }),
    endpoints: (builder) => ({
        singup: builder.mutation({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body : user
            })
        }) ,
        
        login: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        })
    })
})

export const { useLoginMutation, useSingupMutation } = api

export default api