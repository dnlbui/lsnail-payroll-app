import { Form, DateRangePicker, SelectPicker } from 'rsuite';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import TicketListExcerpt from './TicketListExcerpt';
import { setStartDate, setEndDate, setName } from './TicketListSlice';

const TicketSearchBar = () => {
  //dispatch for redux toolkit
  const dispatch = useDispatch();

  // fxns handling input changes
  const handleNameInput = (event) => {dispatch(setName(event!==null?event:''))};
  const handleStartDateInput = async (value) => {dispatch(setStartDate(value!==null?value[0]:''))};
  const handleEndDateInput = async (value) => {dispatch(setEndDate(value!==null?value[1]:''))};
  
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
    //map query data to picker data. This is an array of objects with label and value properties
    pickerData = queryData.map( element => ({ label: element.name, value: element._id }))
    content = (<SelectPicker label="Employee" data={pickerData} onChange={(value)=>handleNameInput(value)} style={{ width: 175 }} />)
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
              }}
            />
          </Form.Group>

        </Form>
      </div>

      <TicketListExcerpt/>
      <hr/>
    </Fragment>
  )
}

export default TicketSearchBar;