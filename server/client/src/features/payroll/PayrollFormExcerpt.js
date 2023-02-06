import React, { Fragment } from 'react';
import { DateRangePicker } from 'rsuite';
import { useRef, useState } from 'react';

import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import {useGetPayrollQuery} from './PayrollApiSlice';

const PayrollForm = () => {
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

  let content
  if(isLoading) {
    return(
      <div>Loading...</div>
    )
  }
  else if(isSuccess) {

    content = data.map((element) => (
      <div className='col'>
        <div className="card" value={element._id} style={{width: 400}}>
          <div className="card-body">
            <h5 className="card-title text-center">Employee's Calculated Payroll</h5>
            <hr/>
            <h5 className="card-title text-center">Service Total:</h5>
            <h5 className="card-title text-center">${element.serviceTotal}</h5>
            <h5 className="card-title text-center">Tip Total:</h5>
            <h5 className="card-title text-center">${element.tipTotal}</h5>
            <h5 className="card-title text-center">Gross Total:</h5>
            <h5 className="card-title text-center">${element.grossTotal}</h5>
            <h5 className="card-title text-center">Employee Paycheck Amount:</h5>
            <h5 className="card-title text-center">${element.EmployeePayCheck}</h5>
            <h5 className="card-title text-center">Employee Cash Amount:</h5>
            <h5 className="card-title text-center">${element.EmployeePayCash}</h5>
          </div>
        </div>
      </div>
    ))
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
      <div className='container'>
        <section className='registerticket'>
          <div className='row row-cols-2 gy-10 offset-4'>
            <br></br>
            <p ref={errRef} className={errMsg ? 'error' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            
          </div>
        <div className='row row-cols-2 gy-5 offset-4'>
          
          <form>
          <p>Select an employee and date range to calculate payroll</p>
          <br></br>
            {/* <!-- Name input--> */}
            <div className="form-outline mb-4">
              <select className="form-select" id="name" aria-label="Default select example" value={name} onChange={handleNameInput} required >
                <option key='SelectDefault' value=''>Select Employee</option>
                {optionsContent}
              </select>
              <label className="form-label" htmlFor="NameInput">Name</label>
            </div>

            {/* <!-- Date input--> */}
            <div className="form-outline mb-4">
              <DateRangePicker
                format="yyyy-MM-dd hh:mm aa"
                showMeridian
                defaultCalendarValue={[new Date(), new Date()]}
                hoverRange="week" 
                isoWeek ranges={[]}
                ref={userRef} 
                onOk={(value)=>{ 
                    handleStartDateInput(value); 
                    handleEndDateInput(value);
                  }
                }
              />
              <label className="form-label" htmlFor="DateInput">Service Date</label>
            </div>
          </form>
        </div>
      </section>
      <section className='ticketlist'>
        <div className='container'>
          <div className="row row-cols-3 gy-5 justify-content-center">
            {content}
          </div>
        </div>
      </section>
      <hr/>
      </div>
    </Fragment>
  )
}

export default PayrollForm;