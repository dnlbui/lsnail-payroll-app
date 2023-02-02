// an extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: (credentials) => ({
        url:'/auth/signin',
        method: 'POST',
        body: {...credentials},
        providesTags: ['Foo']
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url:'/auth/signup',
        method: 'POST',
        body: {...credentials},
        providesTags: ['Fii']
      })
    })
  })
})

export const {
  useLoginMutation, useRegisterMutation
} = authApiSlice
