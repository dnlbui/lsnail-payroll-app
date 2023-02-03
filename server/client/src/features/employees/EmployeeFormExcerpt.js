import React, {Fragment} from 'react';
import { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import { useRegisterMutation } from './EmployeesApiSlice';


//Returns a card for each product
const EmployeeForm = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(()=> {
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrMsg('')
  },[email,image])
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      //unwrap from redux toolkit cuz lets us use try catch block and response accordingly 
      register({ email, image, name });
      //set local state to empty string
      setEmail('');
      setImage('');
      setName('');
      navigate('/employees')
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.originalStatus?.status === 400) {
        setErrMsg('Missing Username or Image');
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
  const handleNameInput = (e) => setName(e.target.value);


  const content = isLoading ? <h1>Loading...</h1> : (
    <Fragment>
    <div className='container'>
    <section className='register'>
      <div className="row row-cols-2 gy-10 offset-4">
        <br></br>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <br></br>
      </div>
      <div className="row row-cols-2 gy-5 offset-4">
        <h1 className="text-center">Add Employee Form</h1>
      </div>
      <div className="row row-cols-2 gy-5 offset-4">
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
          <button type="submit" className="btn btn-primary btn-block mb-4">Add New Employee</button>
        </form>
      </div>
    </section>
    <hr/>
    </div>
    </Fragment>
  )

  return content
}

export default EmployeeForm;