import React, {Fragment} from 'react';
import { useRef, useState, useEffect } from 'react';

import { useEmployeesListQuery } from '../employees/EmployeesApiSlice';
import { useRegisterTicketMutation } from './TicketsApiSlice';

//Submit ticket form. Returns a form with input fields for date, total, and tip.
const TicketForm = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const [name, setName] = useState(''); // is actually employeeId
  const [date, setDate] = useState('');
  const [total, setTotal] = useState('');
  const [tip, setTip] = useState('');

  const { 
    data: employees,
    isLoading: employeesLoading,
    isSuccess: employeesIsSuccess,
    isError: employeesIsError,
    //error: employeesError,
  } = useEmployeesListQuery();

  let content
  if (employeesLoading) {
    content = <Fragment></Fragment>
  }
  else if (employeesIsSuccess) {
    content = employees.map((employee) => (
      <option key={employee._id} value={employee._id}>{employee.name}</option>
    ))
  }
  else if (employeesIsError) {
    content = <Fragment></Fragment>
  } 

  const [registerTicket, { isLoading }] = useRegisterTicketMutation();
    

  useEffect(()=> {
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrMsg('')
  },[date,total,tip])

  const handleSubmit = async(e) => {

    e.preventDefault()

    try{
      //unwrap from redux toolkit cuz lets us use try catch block and response accordingly 
      registerTicket({ name, date, total, tip });

      //set local state to empty string
      setDate('');
      setTotal('');
      setTip('');

    } catch (err) {
      if(!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.originalStatus?.status === 400) {
        setErrMsg('Missing a date or total input');
      } else if (err.originalStatus?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Register Failed');
      }
      errRef.current.focus();
    }
  }

  const handleNameInput = (e) => setName(e.target.value);
  const handleDateInput = (e) => setDate(e.target.value);
  const handleTotalInput = (e) => setTotal(e.target.value);
  const handleTipInput = (e) => setTip(e.target.value);

  const renderTicketForm = isLoading ? <h1>Loading...</h1> : (
    <Fragment>
      <section className='registerticket'>

        <div className='row'>
          <h1 className='text-center'>Add Ticket Form</h1>
        </div>
    
        <div className='row gy-5'>
          
          <form onSubmit={handleSubmit}>
            
            {/* <!-- Name input--> */}
            <div className="form-outline mb-4">
              <select className="form-select" id="name" aria-label="Default select example" value={name} onChange={handleNameInput} required >
                <option key='SelectDefault' value=''>Select Employee</option>
                {content}
              </select>
              <label className="form-label" htmlFor="NameInput">Name</label>
            </div>

            {/* <!-- Date input--> */}
            <div className="form-outline mb-4">
              <input type="datetime-local" id="date" className="form-control" value={date} onChange={handleDateInput} ref={userRef} required/>
              <label className="form-label" htmlFor="DateInput">Service Date</label>
            </div>

            {/* <!-- Total input--> */}
            <div className="form-outline mb-4">
              <input type="number" id="total" className="form-control" value={total} onChange={handleTotalInput} required/>
              <label className="form-label" htmlFor="TotalInput">Service Total</label>
            </div>

            {/* <!-- Tip input--> */}
            <div className="form-outline mb-4">
              <input type="number" id="tip" className="form-control" value={tip} onChange={handleTipInput} required/>
              <label className="form-label" htmlFor="TipInput">Credit Card Tip</label>
            </div>

            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-outline-dark btn-block mb-4">Submit</button>
          </form>

          <div className='row'>
            <br></br>
            <p ref={errRef} className={errMsg ? 'error' : 'offscreen'} aria-live="assertive">{errMsg}</p>
          </div>

        </div>
      </section>
      <hr/>
    </Fragment>
  )

  return renderTicketForm;
}

export default TicketForm;
