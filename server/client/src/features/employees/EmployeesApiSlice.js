// an extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    employeesList: builder.query({ 
      query: () => ({
        url:'api/employeelist',
        method: 'GET',
        providesTags: ['Get'] 
      })
    }),
    employeeForm: builder.mutation({
      query: (credentials) => ({
        url:'api/employeelist',
        method: 'POST',
        body: {...credentials},
        invalidatesTags: ['Get']
      })
    })
  })
})

export const {
  useEmployeesListQuery, useEmployeeFormMutation
} = authApiSlice

