import { useTicketsListQuery } from "./TicketsApiSlice";
import { useSelector } from "react-redux";
import TicketCardExcerpt from "./TicketCardExcerpt";
import { selectStartDate, selectEndDate, selectName } from "./TicketListSlice";

const TicketList = () => {
  const name = useSelector(selectName);
  const startDate = useSelector(selectStartDate);
  const endDate = useSelector(selectEndDate);

  //Query string that will be passed to the API. Had to do this since it did not allow me to pass multiple parameters...
  let searchBarQuery = `employeeId=${name}&dateStart=${startDate}&dateEnd=${endDate}`;

  //destructure data from EmployeeList Query
  const {
    data: queryData,
    isLoading,
    isSuccess,
    isError,
    error
  }  = useTicketsListQuery(searchBarQuery, {skip: name === '' || startDate === '' || endDate ===''}, {refetchOnMountOrArgChange: true});

  //if statement that will return component depending on query status
  let content;
  if(isLoading) {
    content = <p>Loading...</p>
  } 
  else if (isSuccess) {
    content = queryData.map( element => {
      return(<TicketCardExcerpt key={element._id} element={element}/>)
    })
  } 
  else if (isError) {
    content = <p>{error}</p>
  }
  return (
    <section className='ticketlist'>
      <div className='container'>
        <div className="row row-cols-3 gy-5 offset-1">
          {content}
        </div>  
      </div>
    </section>
  )
}

export default TicketList