import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CategoryType, UserFormDataType } from '../types';
import { register } from '../lib/apiWrapper';
import { useNavigate } from 'react-router-dom';


type LoginProps = {
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void
}

export default function Login({ flashMessage }: LoginProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserFormDataType>>(
        {
            username: '',
            password: '',
        }
    )

    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userFormData);
    }

    return (
        <>
            <h1 className="text-center">Log In Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control id='username' name='username' placeholder='Enter Username' value={userFormData.username} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3'>Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}