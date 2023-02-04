// an extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    ticketsList: builder.query({
      query: (employeeId,dateStart,dateEnd) => ({
        url:`api/ticket/?employeeId=${employeeId}&dateStart=${dateStart}$dateEnd=${dateEnd}`,
        method: 'GET',
        providesTags: ['employeelist']
      })
    }),
    registerTicket: builder.mutation({
      query: (credentials) => ({
        url:'api/ticket/',
        method: 'POST',
        body: {...credentials},
        providesTags: ['regEmployee']
      })
    })
  })
})

export const {
  useTicketsListQuery, useRegisterTicketMutation
} = ticketsApiSlice