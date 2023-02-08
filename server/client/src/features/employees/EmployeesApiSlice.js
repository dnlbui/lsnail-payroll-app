// an extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    employeesList: builder.query({ 
      query: () => ({
        url:'/api/employeelist',
        method: 'GET',
      }),
      providesTags: ['GetEmployees']
    }),
    registerEmployee: builder.mutation({
      query: (credentials) => ({
        url:'api/employeelist',
        method: 'POST',
        body: {...credentials},
      }),
      // invalidates the query when the mutation is performed
      invalidatesTags: ['GetEmployees']
    }),
    deleteEmployee: builder.mutation({
      query: (employeeId) => ({
        url:`api/employeelist/${employeeId}`,
        method: 'DELETE',
      }),
      // invalidates the query when the mutation is performed
      invalidatesTags: ['GetEmployees']
    }),
  })
})

export const {
  useEmployeesListQuery, useRegisterEmployeeMutation, useDeleteEmployeeMutation
} = authApiSlice


