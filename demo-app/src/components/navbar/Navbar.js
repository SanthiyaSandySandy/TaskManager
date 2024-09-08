import React from 'react';
import './Navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const Navbar = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const isLoggedIn = useSelector((state)=> state.isLoggedIn)
  // console.log(isLoggedIn)
  const logout = () => {
    sessionStorage.clear("id")
    dispatch(authActions.logout())
    history("/")
  }


  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand">Task Manager</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    <li classNameclass="nav-item mx-2">
          <Link className="nav-link active btn-nav" aria-current="page" to="/todo">To Do</Link>
        </li>
        {!isLoggedIn && <>
          <li classNameclass="nav-item mx-2">
          <Link className="nav-link active btn-nav" aria-current="page" to="/signup">SignUp</Link>
        </li>
        <li classNameclass="nav-item mx-2">
          <Link className="nav-link active btn-nav" aria-current="page" to='/signin'>Login</Link>
        </li>
        </>
        }
        {isLoggedIn && <>
          <li classNameclass="nav-item mx-2">
          <Link className="nav-link active btn-nav" aria-current="page" to="/" onClick={logout}>Logout</Link>
        </li>
        </>
        }
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
