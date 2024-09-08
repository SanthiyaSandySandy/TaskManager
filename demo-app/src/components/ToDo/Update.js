import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Update = ({ display, update }) => {


  const [inputs, setInputs] = useState({ title: "", body: "" })

  useEffect(() => {
    setInputs({
      title: update.title,
      body: update.body
    })
  }, [update])

  const handleChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async () => {
    // console.log(inputs)
    await axios
      .put(`https://taskmanager-finalbackend.onrender.com/api/v1/updateTask/${update._id}`, inputs)
      .then((response) => {
        toast.success(response.data.message)
        console.log(response)
      })
    display("none")
  }

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <ToastContainer/>
      <h3>Update Your Task</h3>
      <input type='text' className='todo-inputs my-4 w-100 p-3' value={inputs.title} name="title" onChange={handleChange} />
      <textarea className='todo-inputs w-100 p-3' value={inputs.body} name="body" onChange={handleChange} />
      <div>
        <button className='btn btn-dark my-4' onClick={() => {
          handleSubmit()
        }}>UPDATE</button>
        <button className='btn btn-danger my-4 mx-3' onClick={() => {
          display("none")
        }}>Close</button>
      </div>
    </div>
  )
}

export default Update
