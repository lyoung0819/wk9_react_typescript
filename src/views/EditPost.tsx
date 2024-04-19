import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editPostById, getPostById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CategoryType, PostFormDataType, UserType } from '../types';


type EditPostProps = {
    flashMessage: (message:string, category:CategoryType) => void,
    currentUser: UserType|null
}

export default function EditPost({ flashMessage, currentUser }: EditPostProps) {
    const { postID } = useParams();
    const navigate = useNavigate();

    const [postToEditData, setPostToEditData] = useState<PostFormDataType>({title: '', body: ''});

    useEffect( () => {
        async function getPost(){
            let response = await getPostById(postID!)
            if (response.data){
                const post = response.data
                const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}')
                if (currentUser?.id !== post.author.id){
                    flashMessage('You do not have permission to edit this post', 'danger');
                    navigate('/')
                } else {
                    setPostToEditData({title: post.title, body: post.body})
                }
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/')
            }
        }

        getPost()
    }, [postID, currentUser] )

 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostToEditData({...postToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editPostById(postID!, token, postToEditData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.title} has been updated`, 'success')
            navigate('/')
        }
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Edit Post</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control name='title' placeholder='Edit Post Title' value={postToEditData.title} onChange={handleInputChange} />
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control name='body' placeholder='Edit Post Body' value={postToEditData.body} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Edit Post</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}