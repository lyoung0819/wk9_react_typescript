import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AlertMessage from './components/AlertMessage'
import Navigation from "./components/Navigation";
import Container from 'react-bootstrap/Container'
import Home from './views/Home';
import SignUp  from "./views/SignUp";
import { CategoryType } from './types'



export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [message, setMessage] = useState<string|undefined>(undefined)
  const [category, setCategory] = useState<CategoryType|undefined>(undefined)

  const handleClick = () => {
    setisLoggedIn(!isLoggedIn)
  }

  const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
    setMessage(newMessage);
    setCategory(newCategory);
  }

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} />
      <Container>
        {message && <AlertMessage message={message} category={category} flashMessage={flashMessage}/>}
        <Routes>
            <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleClick={handleClick} />} />
            <Route path="/signup" element={ <SignUp flashMessage={flashMessage}/>} /> 
        </Routes>
      </Container>
    </>
  )
}

// posts.map() --- in this func, the return value (the child) always needs a key prop (key={p.id})