import { Form, DateRangePicker, SelectPicker } from 'rsuite';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import TicketListExcerpt from './TicketListExcerpt';
import { setStartDate, setEndDate, setName } from './TicketListSlice';
import { startOfDay, endOfDay, parseISO, addDays, endOfWeek, startOfWeek, startOfMonth, endOfMonth, addMonths, subDays } from 'date-fns';

const TicketSearchBar = () => {
  //dispatch for redux toolkit
  const dispatch = useDispatch();

  // fxns handling input changes
  const handleNameInput = (event) => {dispatch(setName(event!==null?event:''))};
  const handleStartDateInput = async (value) => {
    let valueStartDate = value[0];
    dispatch(setStartDate(value!==null || typeof value === Object ?valueStartDate:''))};
  const handleEndDateInput = async (value) => {
    let valueEndDate = value[1];
    //parseISO(new Date(value[1].toString()).toISOString());
    dispatch(setEndDate(value!==null?valueEndDate:''))};
  
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
    content = <div>Loading...</div>
  }
  else if (isSuccess) {
    //map query data to picker data. This is an array of objects with label and value properties
    pickerData = queryData.map( element => ({ label: element.name, value: element._id }))
    content = (<SelectPicker label="Employee" data={pickerData} onChange={(value)=>handleNameInput(value)} style={{ width: 300 }} />)
  }
  else if (isError) {
    content = <div>{error}</div>
  }

  const predefinedRanges = [
    {
      label: 'Today',
      value: [startOfDay(new Date()), endOfDay(new Date())],
      placement: 'left'
    },
    {
      label: 'Yesterday',
      value: [addDays(startOfDay(new Date()), -1), addDays(endOfDay(new Date()), -1)]
    },
    {
      label: 'This week',
      value: [startOfWeek(startOfDay(new Date())), endOfWeek(endOfDay(new Date()))],
      placement: 'left'
    },
    {
      label: 'Last 7 days',
      value: [subDays(startOfDay(new Date()), 6), endOfDay(new Date())]
    },
    {
      label: 'Last month',
      value: [startOfMonth(addMonths(startOfDay(new Date()), -1)), endOfMonth(addMonths(endOfDay(new Date()), -1))],
      placement: 'left'
    },
    {
      label: 'This year',
      value: [new Date(startOfDay(new Date()).getFullYear(), 0, 1), endOfDay(new Date())],
      placement: 'left'
    },

  ]

  return (
    <Fragment>

      <div className="row gy-10">
        <div className="col ">
          <div className="jumbotron jumbotron-fluid ">
            <h1 className="display-8 text-center">Ticket List</h1>
          </div>
        </div>
      </div>
    
        <Form layout="inline">
          <div className='row row-cols-1 row-cols-sm-2 justify-content-md-center'>



              {/* The select picker */}
              <Form.Group className="gy-3" controlId="username-7">
                {content}
              </Form.Group>


              {/* The date range picker */}
              <Form.Group className="gy-3 " controlId="date-7">
                <DateRangePicker
                  ranges={predefinedRanges}
                  preventOverflow={true}
                  size="md"
                  placeholder="------Select Date Range------"
                  cleanable={false}
                  format="yyyy-MM-dd hh:mm aa"
                  defaultCalendarValue={[startOfDay(parseISO(new Date().toISOString())), endOfDay(parseISO(new Date().toISOString()))]}
                  isoWeek
                  showOneCalendar
                  onChange={(value)=>{ 
                    handleStartDateInput(value); 
                    handleEndDateInput(value);
                  }}
                />
              </Form.Group>
          </div>
        </Form>
      <TicketListExcerpt/>
    </Fragment>
  )
}

export default TicketSearchBar;