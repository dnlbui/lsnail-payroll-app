import { apiSlice } from "../../app/api/apiSlice";

export const payrollApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPayroll: builder.query({
      query: (PayrollBarQuery) => ({
        url:`/api/ticket/aggregation/?${PayrollBarQuery}`,
        method: 'GET',
      }),
      providesTags: ['GetPayroll']
    }),
  })
});

export const {
  useGetPayrollQuery
} = payrollApiSlice;