import { Form,Button, DateRangePicker, SelectPicker } from 'rsuite';
import { Fragment, useState } from 'react';
import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import { useTicketsListQuery } from './TicketsApiSlice';

const TicketsListSearchBar = () => {
  const [startDate, setStartDate] = useState(new Date('2022-02-01 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2022-05-01 23:59:59'));
  const [name, setName] = useState("Pick an Employee" );

  const {employeeList} = useTicketsListQuery();

  const handleNameInput = (event) => {setName(event); console.log(event)};
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

  const handleSubmit = (e) => {
    e.preventDefault()

    try{
      employeeList({name,startDate,endDate});
      setStartDate('');
      setEndDate('');
      setName('');  
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <Fragment>
    <div className='col-lg-7 offset-lg-3 '>
      <Form layout="inline" onSubmit={(e)=>handleSubmit(e)}>
        {content}

        <DateRangePicker
          format="yyyy-MM-dd hh:mm aa"
          showMeridian
          defaultCalendarValue={[startDate, endDate]}
          hoverRange="week" 
          isoWeek ranges={[]}
          onOk={(value)=>{ handleStartDateInput(value[0]); handleEndDateInput(value[1]);}}
        />

        <Button>Submit Ticket Filter</Button>
      </Form>
      
    </div>
    <hr/>
    </Fragment>
    )
}

export default TicketsListSearchBar;