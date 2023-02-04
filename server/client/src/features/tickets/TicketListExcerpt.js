import { Fragment } from 'react';
import { useTicketsListQuery } from "./TicketsApiSlice";
import TicketCardExcerpt from "./TicketCardExcerpt";

const TicketList = ({name, startDate, endDate}) => {
  //destructure data from EmployeeList Query
  const {
    data: queryData,
    isLoading,
    isSuccess,
    isError,
    error
  }  = useTicketsListQuery(name, startDate, endDate);

  //if statement that will return component depending on query status
  let content;
  if(isLoading) {
    content = <p>Loading...</p>
  } 
  else if (isSuccess) {
    content = queryData.map( element => {
      return(<TicketCardExcerpt key={element._id} element={element}/>)
    })
    console.log(queryData);
  } 
  else if (isError) {
    content = <p>{error}</p>
  }
  return (
  <Fragment>{content}</Fragment>
  )
}

export default TicketList