import { useState } from "react";
import Navigation from "./components/Navigation";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function App() {
  // return React.createElement('div', {}, 'Hello World') // (element, props, element children(can be another createElement)) // would require import Reach from 'react';
  // return <h1>Hello World!!!!!</h1> // this html-looking text is actually JSX (or TSX since we're using typescript). It is creating a React element

  // within the TSX/JSX, we can hard code out of it to normal TS/JS by using {}
  const firstName: string = 'Lexie';
  const lastName: string = 'Young';
  const [isLoggedIn, setisLoggedIn] = useState(false);
  // let isLoggedIn: boolean = true;
  // const posts: {id:number, title:string}[] = [
  //   {id: 1, title: 'Happy Monday'},
  //   {id: 2, title: 'React Rules'},
  //   {id: 3, title: 'Spring has Sprung'}
  // ]
  type Post = {
    id: number,
    title: string
  }

  type Sorting = {
    idAsc: (a: Post, b:Post) => number,
    idDesc: (a: Post, b:Post) => number,
    titleAsc: (a: Post, b:Post) => number,
    titleDesc: (a: Post, b:Post) => number,
  }


  const [posts, setPosts] = useState([
    { id: 1, title: 'Happy Monday' },
    { id: 2, title: 'React Rules' },
    { id: 3, title: 'Spring has Sprung' }
  ]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    const sortFunctions: Sorting = {
      idAsc: (a: Post, b: Post) => a.id - b.id,
      idDesc: (a: Post, b: Post) => b.id - a.id,
      titleAsc: (a: Post, b: Post) => a.title > b.title ? 1 : -1,
      titleDesc: (a: Post, b: Post) => b.title > a.title ? 1 : -1
    }
    let func = sortFunctions[e.target.value as keyof Sorting]
    let newSortedArr = [...posts].sort(func)
    setPosts(newSortedArr)
  }

  const handleClick = () => {
    setisLoggedIn(!isLoggedIn)
  }

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} />
      <Container>
        <h1>Hello World</h1>
        <Button variant='primary' onClick={handleClick}>Click me!</Button>
        <h2>{isLoggedIn ? `Welcome back, ${firstName} ${lastName}` : 'Please Log In or Sign Up'}</h2>
        {isLoggedIn && <Form.Select onChange={handleSelectChange}>
          <option value='main'>Sort Posts by ID or Title:</option>
          <option value='idAsc'>Sort by ID Ascending</option>
          <option value='idDsc'>Sort by ID Descending</option>
          <option value='titleAsc'>Sort by Title Ascending</option>
          <option value='titleDsc'>Sort by Title Descending</option>
        </Form.Select>}
        {isLoggedIn && posts.map(p => <h4 key={p.id}>{p.title}</h4>)}
      </Container>
    </>
  )
}

// posts.map() --- in this func, the return value (the child) always needs a key prop (key={p.id})