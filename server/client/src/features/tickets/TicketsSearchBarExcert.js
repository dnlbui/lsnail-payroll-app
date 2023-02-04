import { Form, DateRangePicker, SelectPicker } from 'rsuite';
import { Fragment, useState } from 'react';
import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import TicketList from './TicketListExcerpt';

const TicketSearchBar = () => {
  const [startDate, setStartDate] = useState(new Date('2022-02-01 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2022-05-01 23:59:59'));
  const [name, setName] = useState("Pick an Employee" );

  const handleNameInput = (event) => {setName(event)};
  const handleStartDateInput = async (value) => {setStartDate(value)};
  const handleEndDateInput = async (value) => setEndDate(value);

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
  if(isLoading) {
    content = <p>Loading...</p>
  }
  else if (isSuccess) {
    pickerData = queryData.map( element => ({ label: element.name, value: element._id }))
    content = (<SelectPicker label="User" data={pickerData} onSelect={(value)=>handleNameInput(value)} style={{ width: 150 }} />)
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
            defaultCalendarValue={[startDate, endDate]}
            hoverRange="week" 
            isoWeek ranges={[]}
            onOk={(value)=>{ handleStartDateInput(value[0]); handleEndDateInput(value[1]);}}
          />
        </Form.Group>

      </Form>
      <TicketList name={name} startDate={startDate} endDate={endDate}/>
    </div>
    <hr/>
    </Fragment>
    )
}

export default TicketSearchBar;