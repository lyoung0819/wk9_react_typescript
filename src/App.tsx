import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Container from 'react-bootstrap/Container'
import Home from './views/Home';
import SignUp  from "./views/SignUp";



export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleClick = () => {
    setisLoggedIn(!isLoggedIn)
  }



  // Return
  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} />
      <Container>
        <Routes>
            <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleClick={handleClick} />} />
            <Route path="/signup" element={ <SignUp />} /> 
        </Routes>
      </Container>
    </>
  )
}

// posts.map() --- in this func, the return value (the child) always needs a key prop (key={p.id})