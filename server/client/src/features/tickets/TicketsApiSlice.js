// an extended slice of the api slice in app folder
import { apiSlice } from "../../app/api/apiSlice";

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    ticketsList: builder.query({
      query: (searchBarQuery) => ({
        url:`/api/ticket/?${searchBarQuery}`,
        method: 'GET',
        
      }),
      providesTags: ['GetTicket']
    }),
    registerTicket: builder.mutation({
      query: (credentials) => ({
        url:`api/ticket/${credentials.name}`,
        method: 'POST',
        body: {...credentials},
        
      }),
      invalidatesTags: ['GetTicket']
    }),
    deleteTicket: builder.mutation({
      query: (ticketId) => ({
        url:`api/ticket/${ticketId}`,
        method: 'DELETE',
      }),
      // invalidates the query when the mutation is performed
      invalidatesTags: ['GetTicket']
    }),
  })
})

export const {
  useTicketsListQuery, useRegisterTicketMutation, useDeleteTicketMutation
} = ticketsApiSlice