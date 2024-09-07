
import React, { useState } from 'react'
import './SignUp.css'
import HeadingComp from './HeadingComp';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const SignUp = () => {

  const history =  useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    username:"",
    password:"",
    confirmPassword:""
  })

  const handleChange = (e) => { 
    const {name,value} = e.target;
    setInputs({...inputs, [name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://taskmanager-backend-ekmq.onrender.com/api/v1/register", inputs).then((response)=>{
      // console.log(response);
      if (response.data.message === "User already exists"){
        // alert(response.data.message)
        toast.error(response.data.message)
      } else {
        toast.success(response.data.message)
        // alert(response.data.message)
        setInputs({
          email:"",
          username:"",
          password:"",
          confirmPassword:""
        })
        history("/signin")
      }
    })
  }

  return (
    <div className='signup'>
       <ToastContainer />
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column w-100 p-5'>
            <input className="p-2 my-3 input-signup" type='email' name="email" placeholder='Email' value={inputs.email} onChange={handleChange} />
            <input className="p-2 my-3 input-signup" type='username' name ='username' placeholder='UserName' value={inputs.username} onChange={handleChange}/>
            <input className="p-2 my-3 input-signup" type='password' name='password'placeholder='Password' value={inputs.password} onChange={handleChange}/>
            <input className="p-2 my-3 input-signup" type='password'  name='confirmPassword' placeholder='Confirm Password' value={inputs.confirmPassword} onChange={handleChange}/>
            <button className='btn-signup p-2' onClick={handleSubmit}>Sign Up</button>
            </div>
          </div>
          // <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
          //   <HeadingComp first="Sign" second="Up"/>
          // </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
