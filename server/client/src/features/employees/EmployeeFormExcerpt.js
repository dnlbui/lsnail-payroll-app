import React, {Fragment, useRef, useState, useEffect } from 'react';
import { useRegisterEmployeeMutation, useEmployeesListQuery } from './EmployeesApiSlice';


//Submit employee form. Returns a form with input fields for name, email, and image.
const EmployeeForm = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')

  const [registerEmployee, { isLoading }] = useRegisterEmployeeMutation()

  useEffect(()=> {
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrMsg('')
  },[email,name])
  
  const handleSubmit = async(e) => {
    //prevent page refresh
    e.preventDefault()

    try{
      //unwrap from redux toolkit cuz lets us use try catch block and response accordingly 
      registerEmployee({ email, image, name });

      //set local state to empty string
      setEmail('');
      setImage('');
      setName('');
    } 
    catch (err) {
      if(!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.originalStatus?.status === 400) {
        setErrMsg('Missing name or email input');
      } else if (err.originalStatus?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Register Failed');
      }
      errRef.current.focus();
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleImageInput = (e) => setImage(e.target.value);
  const handleNameInput  = (e) => setName(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <Fragment>
    
    <section className='register'>

      {/* <!-- Header Title --> */}
      <div className="col gy-5 ">
        <h1 className="text-center">Add Employee Form</h1>
      </div>

      <div className="col gy-5 ">
        <form onSubmit={handleSubmit}>
          {/* <!-- Name input --> */}
          <div className="form-outline mb-4">
            <input type="text" id="name" ref={userRef} value={name} onChange={handleNameInput} required className="form-control" />
            <label className="form-label" htmlFor="NameInput">Name</label>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" id="email" ref={userRef} value={email} onChange={handleEmailInput} required className="form-control" />
            <label className="form-label" htmlFor="EmailInput">Email address</label>
          </div>

          {/* <!-- Image input --> */}
          <div className="form-outline mb-4">
            <input type="text" id="image" onChange={handleImageInput} value={image} required className="form-control" />
            <label className="form-label" htmlFor="ImageInput">Image Url</label>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-outline-dark btn-block mb-4">Add New Employee</button>
        </form>
      </div>

      <div className="col gy-10 ">
        <br></br>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <br></br>
      </div>
    </section>
    <hr/>
    </Fragment>
  )

  return content
}

export default EmployeeForm;