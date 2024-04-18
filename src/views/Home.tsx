import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm';
import { PostFormDataType, PostType } from '../types';
import { getAllPosts } from '../lib/apiWrapper';


type Sorting = {
    idAsc: (a: PostType, b: PostType) => number,
    idDsc: (a: PostType, b: PostType) => number,
    titleAsc: (a: PostType, b: PostType) => number,
    titleDsc: (a: PostType, b: PostType) => number,
}

// must defined the HomeProps TYPE and then destructure it to use is in your function (peep Home())
type HomeProps = {
    isLoggedIn: boolean, 
    handleClick: () => void
}

export default function Home({isLoggedIn, handleClick}: HomeProps) {

    const [showForm, setShowForm] = useState(false);
    const [posts, setPosts] = useState<PostType[]>([])
    
    useEffect(() => {
        async function fetchData(){
            const response = await getAllPosts();
            if (response.data){
                let posts = response.data;
                setPosts(posts)
            }
        }

        fetchData();
    }, [])

    const [searchTerm, setSearchTerm] = useState(''); // initially will be empty string because there will be no words in search bar

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sortFunctions: Sorting = {
            idAsc: (a: PostType, b: PostType) => a.id - b.id,
            idDsc: (a: PostType, b: PostType) => b.id - a.id,
            titleAsc: (a: PostType, b: PostType) => a.title > b.title ? 1 : -1,
            titleDsc: (a: PostType, b: PostType) => b.title > a.title ? 1 : -1
        }
        let func = sortFunctions[e.target.value as keyof Sorting]
        let newSortedArr = [...posts].sort(func)
        setPosts(newSortedArr)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const addNewPost = (newPostData: PostFormDataType) => {
        const author = {id: 1, firstName: 'Lexie', lastName: 'Young', email: 'ly@email.com', username: 'lyoung0819', dateCreated: 'Tues, Apr 16 2024'}
        const newPost: PostType = {...newPostData, id:posts.length+1, dateCreated:new Date().toString(), author}
        setPosts([...posts, newPost]) // setting the current state of Posts to the new copy of posts with our newPost added 
        setShowForm(false);
    }

    return (
        <>
            <h1>Hello World</h1>
            <Button variant='primary' onClick={handleClick}>Click me!</Button>
            <h2>{isLoggedIn ? `Welcome back!` : 'Please Log In or Sign Up'}</h2>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Control value={searchTerm} onChange={handleInputChange} placeholder="Search Posts" />
                </Col>
                <Col>
                    <Form.Select onChange={handleSelectChange}>
                        <option value='main'>Sort Posts by ID or Title:</option>
                        <option value='idAsc'>Sort by Oldest</option>
                        <option value='idDsc'>Sort by Newest</option>
                        <option value='titleAsc'>Sort by Title Ascending</option>
                        <option value='titleDsc'>Sort by Title Descending</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Button className ='w-100' variant='success' onClick={() => (setShowForm(!showForm))}>{ showForm ? 'Hide Post' : 'Add Post+' }</Button>
                </Col>
            </Row>
            { showForm && <PostForm addNewPost={addNewPost}/> }
            {posts.filter(p => p.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map(p => <PostCard key={p.id} post={p} />)}
        </>
    )
}