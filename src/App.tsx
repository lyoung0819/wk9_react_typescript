import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AlertMessage from './components/AlertMessage'
import Navigation from "./components/Navigation";
import Container from 'react-bootstrap/Container'
import EditPost from './views/EditPost';
import Home from './views/Home';
import Login from './views/LogIn'
import SignUp  from "./views/SignUp";
import { UserType, CategoryType } from './types'
import { getMe } from './lib/apiWrapper';



export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp') || 0) > new Date() ? true : false);
  const [loggedInUser, setisLoggedInUser] = useState<UserType|null>(null)
  
  const [message, setMessage] = useState<string|undefined>(undefined)
  const [category, setCategory] = useState<CategoryType|undefined>(undefined)

    // will run function after every render 
  useEffect(() => {
    console.log('This is running')
    async function getLoggedInUser(){
      if (isLoggedIn){
        const token = localStorage.getItem('token') || '' // 401 response if no token, which is fine since youre not logged in
        const response = await getMe(token);
        if (response.data){
          setisLoggedInUser(response.data);
        } else {
          setisLoggedIn(false);
          console.error(response.data)
        }
      }
    }
    getLoggedInUser()
  })

  const handleClick = () => {
    setisLoggedIn(!isLoggedIn)
  }

  const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
    setMessage(newMessage);
    setCategory(newCategory);
  }

  const logUserIn = () => {
    setisLoggedIn(true)
}

  const logUserOut = () => {
    setisLoggedIn(false);
    setisLoggedInUser(null);
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExp')
    flashMessage('You have been logged out', 'dark')
  }

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
      <Container>
        {message && <AlertMessage message={message} category={category} flashMessage={flashMessage}/>}
        <Routes>
            <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} />} />
            <Route path="/signup" element={ <SignUp flashMessage={flashMessage}/>} /> 
            <Route path="/login" element={ <Login flashMessage={flashMessage} logUserIn={logUserIn} />} /> 
            <Route path='/edit/:postId' element={<EditPost flashMessage={flashMessage} currentUser={loggedInUser}/>} />
        </Routes>
      </Container>
    </>
  )
}

// posts.map() --- in this func, the return value (the child) always needs a key prop (key={p.id})