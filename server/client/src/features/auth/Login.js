import React, {Fragment} from 'react';
import { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import Nav from '../../components/NavUnAuth';


//Returns a card for each product
const Login = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //redux toolkit hook to dispatch actions
  const [login, { isLoading }] = useLoginMutation()
  

  //focus on username input on page load
  useEffect(()=> {
    userRef.current.focus()
  },[])

  //clear error message on user input
  useEffect(()=>{
    setErrMsg('')
  },[email,password])
  
  const handleSubmit = async(e) => {
    //prevent page refresh
    e.preventDefault()

    try{
      //unwrap from redux toolkit cuz lets us use try catch block and response accordingly 
      const userData = await login({ email, password }).unwrap()
      // argument should return token and username
      dispatch(setCredentials({ ...userData, email }))
      //set local state to empty string
      setEmail('');
      setPassword('');
      navigate('/welcome')
    } catch (err) {
      if(!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.originalStatus?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.originalStatus?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlepasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <Fragment>
    <Nav/>
    <div className='container'>
      <section className='login'>
        <div className="row row-cols-1 gy-10 offset-4">
          <br></br>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <br></br>
        </div>
        <div className="row row-cols-1 gy-5 offset-4">
          <h1>Log In</h1>
        </div>
        <div className="row row-cols-2 gy-5 offset-4">
          <form onSubmit={handleSubmit}>
            {/* <!-- Email input --> */}
            <div className="form-outline mb-4">
              <input type="email" id="username" ref={userRef} value={email} onChange={handleUserInput} required className="form-control" />
              <label className="form-label" htmlFor="form2Example1">Email address</label>
            </div>

            {/* <!-- Password input --> */}
            <div className="form-outline mb-4">
              <input autoComplete="on" type="password" id="password" onChange={handlepasswordInput} value={password} required className="form-control" />
              <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>

            {/* <!-- Submit button --> */}
            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

            {/* <!-- Register buttons --> */}
            <div className="text-center">
              <p>Create an account? <a href="/register">Register</a></p>
            </div>
          </form>
        </div>
      </section>
    </div>
    </Fragment>
  )

  return content
}

export default Login;