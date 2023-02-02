import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})

// export const emloyeesApiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://127.0.0.1:5000/"
//   }),
//   tagType:['Employees'],
//   endpoints: (builder) => ({
//     getProducts: builder.query({
//       query: (search) => `auth/signin/?${search}`,
//       //could use 'transformReponse:' if wanted to  manipulate req here
//       //if using mutations would need to use invalidate to cause a rerender
//       providesTags: ['Employees'] 
//     }),
//   })
// })

// export const selectProductsResult = emloyeesApiSlice.endpoints.getProducts.select();
// export const { useGetProductsQuery } = emloyeesApiSlice;

//baseUrl:'http://127.0.0.1:5000/'