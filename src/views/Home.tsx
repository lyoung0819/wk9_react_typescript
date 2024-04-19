import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm';
import { CategoryType, PostFormDataType, PostType, UserType } from '../types';
import { getAllPosts, createPost } from '../lib/apiWrapper';


type Sorting = {
    idAsc: (a: PostType, b: PostType) => number,
    idDsc: (a: PostType, b: PostType) => number,
    titleAsc: (a: PostType, b: PostType) => number,
    titleDsc: (a: PostType, b: PostType) => number,
}

// must defined the HomeProps TYPE and then destructure it to use is in your function (peep Home())
type HomeProps = {
    isLoggedIn: boolean, 
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function Home({isLoggedIn, currentUser, flashMessage}: HomeProps) {
    const [showForm, setShowForm] = useState(false);
    const [posts, setPosts] = useState<PostType[]>([])
    const [fetchPostData, setFetchPostData] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const response = await getAllPosts();
            if (response.data){
                let posts = response.data;
                posts.sort((a, b) => (new Date(a.dateCreated) > new Date(b.dateCreated) ? 1 : -1))
                setPosts(posts)
            }
        }
        fetchData();
    }, [fetchPostData])

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

    const addNewPost = async (newPostData: PostFormDataType) => {
        const token = localStorage.getItem('token') || '';
        const response = await createPost(token, newPostData)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else if (response.data) {
            flashMessage(`${response.data.title} has been created`, 'success')
            setShowForm(false);
            setFetchPostData(!fetchPostData)
        }
    }

    return (
        <>
            <h1 className='text-center'>{isLoggedIn ? `Hello ${currentUser?.firstName} ${currentUser?.lastName}` : 'Welcome to the Blog!' }</h1>
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
                {isLoggedIn && 
                    (<Col>
                        <Button className ='w-100' variant='success' onClick={() => (setShowForm(!showForm))}>{ showForm ? 'Hide Post' : 'Add Post+' }</Button>
                    </Col>)
                }
            </Row>
            { showForm && <PostForm addNewPost={addNewPost}/> }
            {posts.filter(p => p.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map(p => <PostCard key={p.id} post={p} currentUser={currentUser}/>)}
        </>
    )
}