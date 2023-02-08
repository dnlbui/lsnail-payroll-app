// an extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    employeesList: builder.query({ 
      query: () => ({
        url:'/api/employeelist',
        method: 'GET',
        providesTags: ['GetEmployee'] 
      }),
      tagTypes: ['GetEmployee']
    }),
    registerEmployee: builder.mutation({
      query: (credentials) => ({
        url:'api/employeelist',
        method: 'POST',
        body: {...credentials},
        invalidatesTags: ()=>['GetEmployee']
      })
    })
  })
})

export const {
  useEmployeesListQuery, useRegisterEmployeeMutation
} = authApiSlice


