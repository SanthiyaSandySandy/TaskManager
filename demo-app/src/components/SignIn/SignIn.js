import React, { useEffect, useState } from 'react'
import './SignIn.css';
import axios from 'axios';
import HeadingComp from '../SignUp/HeadingComp';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { ToastContainer, toast } from 'react-toastify';

const SignIn = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=> state.isLoggedIn)
  const [inputs, setInputs] = useState({email:"", password:""})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({...inputs, [name]:value})
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    await axios.post("https://taskmanager-backend-ekmq.onrender.com/api/v1/login", inputs).then((response)=>{
      console.log(response);
      if(response.data.message === "User not found, Please Sign-Up First" || response.data.message === "Incorrect password" || response.data.message === "User already exists"){
        toast.error(response.data.message)
      } else {
        toast.success("Sign-In success")
        sessionStorage.setItem("id", response.data.others._id)
        dispatch(authActions.login())
        console.log(response.data.others._id)
        history("/todo")
      }
    })
  }


  return (
    <div className='signup'>
      <ToastContainer/>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
            <div className='d-flex flex-column w-100 p-5'>
            <input className="p-2 my-3 input-signup" type='email' name="email" value={inputs.email} placeholder='Email' onChange={handleChange}/>
            <input className="p-2 my-3 input-signup" type='password' name="password" value={inputs.password} placeholder='Password' onChange={handleChange}/>
            <button className='btn-signup p-2' onClick={handleSubmit}>Sign In</button>
            </div>
          </div>
          // <div className='col-lg-4 column col-left d-flex justify-content-center align-items-center'>
          //   <HeadingComp first="Sign" second="In"/>
          // </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
