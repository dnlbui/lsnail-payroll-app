import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
  reducerPath: "api",//optional
  baseQuery: fetchBaseQuery({
    baseUrl: "",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        localStorage.setItem('token', token);
        if (token) {
            //could maybe change to localStorage.getItem('token') if I didn't have protected React routes
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
  }),
  tagType:['Employees'],
  endpoints: builder => ({})
})