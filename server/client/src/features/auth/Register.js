import React, {Fragment} from 'react';
import { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useRegisterMutation } from './authApiSlice';
import Nav from '../../components/NavUnAuth';


//Returns a card for each product
const Register = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()

  useEffect(()=> {
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrMsg('')
  },[email,password])
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      //unwrap from redux toolkit cuz lets us use try catch block and response accordingly 
      const userData = await register({ email, password, name }).unwrap()
      // argument should return token and username
      dispatch(setCredentials({ ...userData, email }))
      //set local state to empty string
      setEmail('');
      setPassword('');
      setName('');
      navigate('/welcome')
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.originalStatus?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Register Failed');
      }
      errRef.current.focus();
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleNameInput = (e) => setName(e.target.value);


  const content = isLoading ? <h1>Loading...</h1> : (
    <Fragment>
    <Nav/>
    <div className='container'>
    <section className='register'>

      <div className="row gy-10 offset-4">
        <br></br>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <br></br>
      </div>

      <div className="row justify-content-md-center">
        <div className='col-md-6'>
          <h1>Register</h1>
        </div>
        
      </div>
      <div className="row justify-content-lg-center">
        <div className="col-md-6">
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

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input type="password" id="password" onChange={handlePasswordInput} value={password} required className="form-control" />
            <label className="form-label" htmlFor="PasswordInput">Password</label>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-outline-dark btn-block mb-4">Sign in</button>

          {/* <!-- Login  --> */}
          <div className="text-center">
            <p>Have an existing account? <a href="/login">Login</a></p>
          </div>
        </form>
        </div>
      </div>
    </section>
    </div>
    </Fragment>
  )

  return content
}

export default Register;