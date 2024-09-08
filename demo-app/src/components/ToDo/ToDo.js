import React, { useEffect, useState } from 'react'
import './ToDo.css'
import ToDoCards from './ToDoCards'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios'


let id = sessionStorage.getItem("id")
let toUpdatedArray = [];

const ToDo = () => {
    const [input, setInput] = useState({ title: "", body: "" })
    const [inputsArray, setInputsArray] = useState([])
    const show = () => {
        document.getElementById("textarea").style.display = "block";
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async () => {
        // console.log(input)
        if (input.title === "" || input.body === "") {
            toast.error("Title or Description should not be empty")
        } else {
            const id = sessionStorage.getItem("id");
            if (id) {
                await axios.post("http://localhost:1000/api/v1/addTask",
                    {
                        title: input.title,
                        body: input.body,
                        id: id
                    }).then((response) => {
                        console.log(response)
                    })
                // setInputsArray([...inputsArray, input])
                setInput({ title: "", body: "" })
                toast.success("New Task Added")
            } else {
                setInputsArray([...inputsArray, input])
                setInput({ title: "", body: "" })
                toast.success("New Task Added")
                toast.error("Your Task is not saved, Please Signin!")
            }
        }
    }
    // console.log(inputsArray)

    const del = async (cardid) => {
        console.log(cardid)
        // console.log(id)
        const id = sessionStorage.getItem("id");
        if (id) {
            await axios
                .delete(`http://localhost:1000/api/v1/deleteTask/${cardid}`, {
                    data: { id: id }
                })
                .then(() => {
                    toast.success("Your Task is deleted")
                })
        } else {
            toast.error("Please SignUp First")

        }
    }

    const dis = (value) => {
        console.log(value)
        document.getElementById("todo-update").style.display = value
    }

    const update = (value) => {
        // console.log(value)
        // console.log(inputsArray[value])
        toUpdatedArray = inputsArray[value]
    }


    useEffect(() => {
        const id = sessionStorage.getItem("id");
        if (id){
            const fetch = async () => {
                await axios
                    .get(`http://localhost:1000/api/v1/getTask/${id}`)
                    .then((response) => {
                        // console.log(response.data.list)
                        setInputsArray(response.data.list)
                    })
            }
            fetch()
        }
    }, [handleSubmit])

    return (
        <>
            <div className='todo'>
                <ToastContainer />
                <div className='todo-main container d-flex justify-content-center align-items-center flex-column'>
                    <div className='d-flex flex-column todo-inputs-div w-100 p-1'>
                        <input type='text' placeholder='Title' name="title" value={input.title} className='my-2 p-2 todo-inputs' onClick={show} onChange={handleInputChange} />
                        <textarea id="textarea" type="text" placeholder='Description' name="body" value={input.body} className='p-2 todo-inputs' onChange={handleInputChange} />
                    </div>
                    <div className='w-lg-50 w-100 d-flex justify-content-end my-3'>
                        <button className='home-btn px-2 py-1' onClick={handleSubmit}>Add</button>
                    </div>
                </div>
                <div className='todo-body'>
                    <div className='container-fluid'>
                        <div className='row'>
                            {inputsArray && inputsArray.map((item, index) => (
                                <div className='col-lg-3 col-11 mx-lg-5 mx-3 my-2' key={index}>
                                    <ToDoCards title={item.title} body={item.body} id={item._id} delId={del} display={dis} updateId={index} toBeUpdated={update}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='todo-update' id="todo-update" >
                <div className='container update'>
                    {" "}
                    <Update display={dis} update={toUpdatedArray}/>
                </div>
            </div>
        </>
    )
}

export default ToDo
