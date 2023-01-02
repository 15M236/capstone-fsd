import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form';
import env from '../../environment'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const[email , setEmail] = useState('')
  const[password , setPassword] = useState('')  
  let [toggle,setToggle]=useState(false)
  let [message,setMessage]=useState("")
  let navigate = useNavigate()
  env.apiurl = "https://capstone-fsd.onrender.com"

  let handleLogin = async ()=>{
    setToggle(true)
    let res = await axios.post(`${env.apiurl}/users/login`,{
      email,
      password
    })
    if(res.data.statusCode===200)
    {
      setToggle(false)
      sessionStorage.setItem('token',res.data.token)
      sessionStorage.setItem('role',res.data.role)
      sessionStorage.setItem('email',res.data.email)
      if(res.data.role === 'admin'){
        navigate('/adminDashboard')
      }else {
        navigate('/customerDashboard')
      }
       
    }
    else
    {
      setToggle(false)
      setPassword("")
      setEmail("")
      setMessage(res.data.message)
      setTimeout(()=>{
        setMessage("")
      },3000)

    }
  }

  return (
    <>
    <div className="login-wrapper">
      <p>Login to Continue</p>
    </div>
    <div className='login-main-wrapper'>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" onClick={()=>handleLogin()}>
          Submit
        </Button>
      </Form>
      {toggle ?<Spinner animation="border" variant="primary" />:<></>}
      {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
    </div>  
    </>
  )
}
