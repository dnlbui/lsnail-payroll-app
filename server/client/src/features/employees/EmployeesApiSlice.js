// an extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    employeesList: builder.query({
      query: () => ({
        url:'api/employeelist',
        method: 'GET',
        providesTags: ['employeelist']
      })
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url:'/auth/signup',
        method: 'POST',
        body: {...credentials},
        providesTags: ['regEmployee']
      })
    })
  })
})

export const {
  useEmployeesListQuery, useRegisterMutation
} = authApiSlice