
import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'

const SignUp = () => {

  const history =  useNavigate()
  const dispatch = useDispatch()
  const [showGoogleLogin,setShowGoogleLogin]=useState(false)
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

  const login = () =>{
    setShowGoogleLogin(true)
  }

  const handleLoginSuccess = async (credentialResponse) => {
    const decodeToken = jwtDecode(credentialResponse.credential)
    // console.log('Decoded Token', decodeToken.name)
    await axios.post("https://taskmanager-finalbackend.onrender.com/api/v1/register",{
      email: decodeToken.email,
      username: decodeToken.name,
      password:"undefined",
      confirmPassword:"undefined"
    }).then((response)=>{
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
    // dispatch(authActions.login())
    //     history("/todo")
  }

  const handleLoginFailure = ()=> {
    console.log("Login Failed")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://taskmanager-finalbackend.onrender.com/api/v1/register", inputs).then((response)=>{
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
            <h6 className='p-2 my-3 input-signup'>Or</h6>
            <button className='btn-signup p-2' onClick={login}>Sign-Up With Google</button>
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

export default SignUp
