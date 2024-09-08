import React from 'react'
import './Home.css'
import {useNavigate} from 'react-router-dom'

const Home = () => {

  const history = useNavigate()
  const addTask = () => {
    history("/signin")
  }
  return (
    <div>
        <div className='home d-flex justify-content-center align-items-center'>
            <div className='container d-flex justify-content-center align-items-center flex-column'>
                <button className='home-btn p-2'onClick={addTask}>Add Tasks</button>
            </div>
        </div>
    </div>
  )
}

export default Home
