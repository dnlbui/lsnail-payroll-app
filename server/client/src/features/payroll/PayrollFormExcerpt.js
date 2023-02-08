import React, { Fragment } from 'react';
import { DateRangePicker } from 'rsuite';
import { useRef, useState } from 'react';

import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import {useGetPayrollQuery} from './PayrollApiSlice';
import { PayrollCard } from './PayrollCardExcerpt';

import { startOfDay, endOfDay, parseISO } from 'date-fns';

const PayrollForm = () => {
  const {afterToday} = DateRangePicker;
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg] = useState('');

  const [name, setName] = useState(''); // is actually employeeId
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleNameInput = (e) => { setName(e.target.value) }
  const handleStartDateInput = (value) => {setStartDate(value!==null?value[0]:'')};
  const handleEndDateInput = (value) => {setEndDate(value!==null?value[1]:'')};

  //Employee list query
  const { 
    data: employees,
    isLoading: employeesLoading,
    isSuccess: employeesIsSuccess,
    isError: employeesIsError,
    error: employeesError,
  } = useEmployeesListQuery();

  let optionsContent
  if (employeesLoading) {
    optionsContent = <p>Loading...</p>
  }
  else if (employeesIsSuccess) {
    optionsContent = employees.map((employee) => (
      <option key={employee._id} value={employee._id}>{employee.name}</option>
    ))
  }
  else if (employeesIsError) {
    optionsContent = <p>{employeesError}</p>
  } 

  // Result of query. Returns a card
  const payrollQueryArgs = `employeeId=${name}&dateStart=${startDate}&dateEnd=${endDate}`;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  }  = useGetPayrollQuery(payrollQueryArgs,{skip: !name || !startDate || !endDate})

  let content = (<div></div>)
  if(isLoading) {
    return(
      <div>Loading...</div>
    )
  }
  else if(isSuccess) {
    content = data.length === 0 ? <p>No data found</p> : <PayrollCard data={data} />
  }
  else if(isError) {
    content = (
      <div>
        Error: {error.message}
      </div>
    )
  }

  return (
    <Fragment>
      <div className='col'>

        <div className="row row-cols-3 gy-10">
          <div className="col ">
            <div className="jumbotron jumbotron-fluid ">
              <div className="container">
                <h1 className="display-8 text-center">Payroll</h1>
              </div>
            </div>
          </div>
        </div>

        <section className='registerticket'>
          <div className='row'>
            <br></br>
            <p ref={errRef} className={errMsg ? 'error' : 'offscreen'} aria-live="assertive">{errMsg}</p>
          </div>

          <div className='row'>
            <form>
              <p>Select an employee and date range to calculate payroll</p>
              <br></br>
              <div className="row">
              <div className="col">
              
              {/* <!-- Name input--> */}
              <div className="form-outline mb-4">
                <select className="form-select" id="name" aria-label="Default select example" value={name} onChange={handleNameInput} required >
                  <option key='SelectDefault' value=''>Select Employee</option>
                  {optionsContent}
                </select>
                <label className="form-label" htmlFor="NameInput">Name</label>
              </div>
              </div>
              <div className="col">
              {/* <!-- Date input--> */}
              <div className="form-outline mb-4">
                <DateRangePicker
                  className={"DateRangePicker"}
                  ref={userRef}
                  oneTap 
                  disabledDate={afterToday()}
                  cleanable={false}
                  format="yyyy-MM-dd hh:mm aa"
                  placeholder="Select Week"
                  defaultCalendarValue={[startOfDay(parseISO(new Date().toISOString())), endOfDay(parseISO(new Date().toISOString()))]}
                  isoWeek 
                  ranges={[]}
                  hoverRange="week" 
                  onChange={(value)=>{ 
                      handleStartDateInput(value); 
                      handleEndDateInput(value);
                    }
                  }
                />
                <div><label className="form-label" htmlFor="DateInput">Service Date</label></div>
              </div>
              </div>
              </div>
            </form>
          </div>
        </section>
        <hr/>
      </div>

      <div className='col'>
        <section className='ticketlist'>
          <div className='container'>
            <div className="row justify-content-center">
              {content}
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  )
}

export default PayrollForm;