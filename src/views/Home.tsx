import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Post = {
    id: number,
    title: string
}

type Sorting = {
    idAsc: (a: Post, b: Post) => number,
    idDsc: (a: Post, b: Post) => number,
    titleAsc: (a: Post, b: Post) => number,
    titleDsc: (a: Post, b: Post) => number,
}

// must defined the HomeProps TYPE and then destructure it to use is in your function (peep Home())
type HomeProps = {
    isLoggedIn: boolean, 
    handleClick: () => void
}

export default function Home({isLoggedIn, handleClick}: HomeProps) {
    const [posts, setPosts] = useState<Post[]>([
        { id: 1, title: 'Happy Monday' },
        { id: 2, title: 'React Rules' },
        { id: 3, title: 'Spring has Sprung' },
        { id: 4, title: 'Another Post' },
        { id: 5, title: 'Lovely Tuesday today!' }
    ]);

    const [searchTerm, setSearchTerm] = useState(''); // initially will be empty string because there will be no words in search bar

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const sortFunctions: Sorting = {
            idAsc: (a: Post, b: Post) => a.id - b.id,
            idDsc: (a: Post, b: Post) => b.id - a.id,
            titleAsc: (a: Post, b: Post) => a.title > b.title ? 1 : -1,
            titleDsc: (a: Post, b: Post) => b.title > a.title ? 1 : -1
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

            {posts.filter(p => p.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())).map(p => <h4 key={p.id}>{p.title}</h4>)}
        </>
    )
}