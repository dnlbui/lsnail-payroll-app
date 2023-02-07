// extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    postInvoiceList: builder.mutation({
      query: (invoiceFormQuery) => ({
        url:`/api/sendinvoice/?${invoiceFormQuery}`,
        method: 'POST',
      }),
      tagTypes: ['GetInvoice']  
    })
  })
})

export const {
  usePostInvoiceListMutation
} = invoiceApiSlice



