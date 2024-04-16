import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from '../components/PostCard'
import { PostType } from '../types';


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
    const [posts, setPosts] = useState<PostType[]>([
        {
            author: {
                dateCreated: "Fri, 29 Mar 2024 16:58:44 GMT",
                email: "brians@codingtemple.com",
                firstName: "Brian",
                id: 1,
                lastName: "Stanton",
                username: "bstanton"
            },
            body: "We are alive!!!!!!",
            dateCreated: "Fri, 29 Mar 2024 17:00:35 GMT",
            id: 1,
            title: "Alive"
        },
        {
            author: {
                dateCreated: "Tue, 14 Apr 2024 16:58:44 GMT",
                email: "brians@codingtemple.com",
                firstName: "Brian",
                id: 1,
                lastName: "Stanton",
                username: "bstanton"
            },
            body: "I love React!",
            dateCreated: "Tue, 16 Apr 2024 17:00:35 GMT",
            id: 2,
            title: "React"
        },
    ])

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

    return (
        <>
            <h1>Hello World</h1>
            <Button variant='primary' onClick={handleClick}>Click me!</Button>
            <h2>{isLoggedIn ? `Welcome back!` : 'Please Log In or Sign Up'}</h2>
            <Row>
                <Col xs={12} md={8}>
                    <Form.Control value={searchTerm} onChange={handleInputChange} placeholder="Search Posts" />
                </Col>
                <Col>
                    <Form.Select onChange={handleSelectChange}>
                        <option value='main'>Sort Posts by ID or Title:</option>
                        <option value='idAsc'>Sort by ID Ascending</option>
                        <option value='idDsc'>Sort by ID Descending</option>
                        <option value='titleAsc'>Sort by Title Ascending</option>
                        <option value='titleDsc'>Sort by Title Descending</option>
                    </Form.Select>
                </Col>
            </Row>

            {posts.filter(p => p.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map(p => <PostCard key={p.id} post={p} />)}
        </>
    )
}