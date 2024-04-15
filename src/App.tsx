
export default function App(){
  // return React.createElement('div', {}, 'Hello World') // (element, props, element children(can be another createElement)) // would require import Reach from 'react';
  // return <h1>Hello World!!!!!</h1> // this html-looking text is actually JSX (or TSX since we're using typescript). It is creating a React element

  // within the TSX/JSX, we can hard code out of it to normal TS/JS by using {}
  const firstName: string = 'Lexie';
  const lastName: string = 'Young';
  const isLoggedIn: boolean = false;
  const posts: {id:number, title:string}[] = [
    {id: 1, title: 'Happy Monday'},
    {id: 2, title: 'React Rules'},
    {id: 3, title: 'Spring has Sprung'}
  ]

  return (
    <div>
        <h1>Hello World</h1>
        <h2>{!isLoggedIn ? `Welcome back, ${firstName}` : 'Please Log In or Sign Up'}</h2>
        {posts.map( p => <h4>{p.title}</h4> )}
    </div>
  )
}