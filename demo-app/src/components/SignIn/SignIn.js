import React, { useState } from 'react'
import './SignIn.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin} from '@react-oauth/google'

const SignIn = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [showGoogleLogin,setShowGoogleLogin]=useState(false)
  const [inputs, setInputs] = useState({email:"", password:""})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs({...inputs, [name]:value})
  }

  const login = () =>{
    setShowGoogleLogin(true)
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:1000/api/v1/login", inputs).then((response)=>{
      console.log(response);
      if(response.data.message === "User not found, Please Sign-Up First" || response.data.message === "Incorrect password" || response.data.message === "User already exists"){
        toast.error(response.data.message)
      } else {
        toast.success("Sign-In success")
        sessionStorage.setItem("id", response.data.others._id)
        dispatch(authActions.login())
        setInputs({
          email:"",
          password:""
        })
        console.log(response.data.others._id)
        history("/todo")
      }
    })
  }

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Login success", credentialResponse)
    dispatch(authActions.login())
        history("/todo")
  }

  const handleLoginFailure = ()=> {
    console.log("Login Failed")
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
            <h6 className='p-2 my-3 input-signup'>Or</h6>
            <button className='btn-signup p-2' onClick={login}>Sign-In With Google</button>
            {
              showGoogleLogin && (
                <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                />
              )
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
