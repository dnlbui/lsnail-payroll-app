import { Form, DateRangePicker, SelectPicker } from 'rsuite';
import { Fragment, useState } from 'react';
import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import TicketList from './TicketListExcerpt';

const TicketSearchBar = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState("" );

  const handleNameInput = (event) => {setName(event!==null?event:'')};
  const handleStartDateInput = async (value) => {setStartDate(value!==null?value[0]:'')};
  const handleEndDateInput = async (value) => {setEndDate(value!==null?value[1]:'')};
  
  //destructure data from EmployeeList Query
  const {
    data: queryData,
    isLoading,
    isSuccess,
    isError,
    error
  }  = useEmployeesListQuery();

  //if statement that will return component depending on query status
  let content;
  let pickerData;
  let list
  if(isLoading) {
    content = <p>Loading...</p>
  }
  else if (isSuccess) {
    pickerData = queryData.map( element => ({ label: element.name, value: element._id }))
    content = (<SelectPicker label="Employee" data={pickerData} onChange={(value)=>handleNameInput(value)} style={{ width: 175 }} />)
    list = (<TicketList name={name} startDate={startDate} endDate={endDate}/>)
  }
  else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <Fragment>
    <div className='col-lg-6 offset-lg-4 '>
      <Form layout="inline">

        <Form.Group controlId="username-7">
          {content}
        </Form.Group>

        <Form.Group controlId="date-7">
          <DateRangePicker
            format="yyyy-MM-dd hh:mm aa"
            showMeridian
            defaultCalendarValue={[new Date(), new Date()]}
            hoverRange="week" 
            isoWeek ranges={[]}
            onChange={(value)=>{ 
              handleStartDateInput(value); 
              handleEndDateInput(value);
            }
          }
          />
        </Form.Group>

      </Form>
    </div>
    <section className='ticketlist'>
        <div className='container'>
          <div className="row row-cols-3 gy-5 offset-1">
            {list}
          </div>  
        </div>
      </section>
    <hr/>
    </Fragment>
    )
}

export default TicketSearchBar;