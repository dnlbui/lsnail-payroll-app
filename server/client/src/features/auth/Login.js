import React from 'react';
import { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';


//Returns a card for each product
const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(()=> {
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrMsg('')
  },[user,pwd])
  
  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      //unwrap from redux toolkit cuz lets us use try catch block and response accordingly 
      const userData = await login({ user, pwd }).unwrap()
      // argument should return token and username
      dispatch(setCredentials({ ...userData, user }))
      //set local state to empty string
      setUser('');
      setPwd('');
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

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <section className='login'>
      <div className="row row-cols-2 gy-10 offset-4">
        <br></br>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <br></br>
      </div>
      <div className="row row-cols-2 gy-5 offset-4">
        <h1>Log In</h1>
      </div>
      <div className="row row-cols-2 gy-5 offset-4">
        <form onSubmit={handleSubmit}>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" id="username" ref={userRef} value={user} onChange={handleUserInput} required className="form-control" />
            <label className="form-label" htmlFor="form2Example1">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
            <input type="password" id="password" onChange={handlePwdInput} value={pwd} required className="form-control" />
            <label className="form-label" htmlFor="form2Example2">Password</label>
          </div>

          {/* <!-- Submit button --> */}
          <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>

          {/* <!-- Register buttons --> */}
          <div className="text-center">
            <p>Create an account? <a href="/">Register</a></p>
          </div>
        </form>
      </div>
    </section>
  )

  return content
}

export default Login;