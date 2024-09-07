import Home from "./components/Home/Home";
import Navbar from "./components/navbar/Navbar"
import SignUp from "./components/SignUp/SignUp"
import SignIn from './components/SignIn/SignIn'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDo from "./components/ToDo/ToDo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const id = (sessionStorage.getItem("id"))
    if (id){
      dispatch(authActions.login())
    }
  },[])
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todo" element={<ToDo/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;