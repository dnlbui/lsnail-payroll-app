import { Fragment } from 'react';
import { useTicketsListQuery } from "./TicketsApiSlice";
import TicketCardExcerpt from "./TicketCardExcerpt";

const TicketList = ({name, startDate, endDate}) => {
  //Query string that will be passed to the API. Had to do this since it did not allow me to pass multiple parameters...
  let searchBarQuery = `employeeId=${name}&dateStart=${startDate}&dateEnd=${endDate}`;

  //destructure data from EmployeeList Query
  const {
    data: queryData,
    isLoading,
    isSuccess,
    isError,
    error
  }  = useTicketsListQuery(searchBarQuery);

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