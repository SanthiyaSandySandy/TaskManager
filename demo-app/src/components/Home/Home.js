import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div>
        <div className='home d-flex justify-content-center align-items-center'>
            <div className='container d-flex justify-content-center align-items-center flex-column'>
                <button className='home-btn p-2'>Add Tasks</button>
            </div>
        </div>
    </div>
  )
}

export default Home