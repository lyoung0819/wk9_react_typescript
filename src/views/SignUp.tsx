import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { CategoryType, UserFormDataType } from '../types';
import { register } from '../lib/apiWrapper';
import { useNavigate } from 'react-router-dom';



type SignUpProps = {
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void
}

export default function SignUp({ flashMessage }: SignUpProps) {
    const navigate = useNavigate(); 
    const [userFormData, setUserFormData] = useState<UserFormDataType>(
    {
        firstName: '',
        lastName: '',
        email:'',
        username: '',
        password: '',
        confirmpassword: ''
    }
    )   

    const [seePassword1, setSeePassword1] = useState(false);
    const [seePassword2, setSeePassword2] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        let response = await register(userFormData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            let newUser = response.data!
            flashMessage(`Congrats ${newUser.firstName} ${newUser.lastName} has been created with the username ${newUser.username}`, 'success')
            navigate('/');
        }
    }

    //more sophisticated password with regex: const disableSubmit = !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\!\?])(?=.*[a-zA-Z]).{8,16}$/.test(userFormData.password) || userFormData.password !== userFormData.password
    const disableSubmit = userFormData.password.length < 5 || userFormData.password !== userFormData.password

    return (
        <>
                <h1 className="text-center">Sign Up Below:</h1>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label htmlFor='fistName'>First Name</Form.Label>
                            <Form.Control value={userFormData.firstName} id='firstName' name='firstName' placeholder='Enter First Name' onChange={handleInputChange} />

                            <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                            <Form.Control value={userFormData.lastName} id= 'lastName' name='lastName' placeholder='Enter Last Name' onChange={handleInputChange} />

                            <Form.Label htmlFor='email'>Email</Form.Label>
                            <Form.Control value={userFormData.email} id='email' name='email' type='email' placeholder='Enter Email' onChange={handleInputChange} />
                            
                            <Form.Label htmlFor='username'>Username</Form.Label>
                            <Form.Control value={userFormData.username} id='username' name='username' placeholder='Enter Username' onChange={handleInputChange} />

                            <Form.Label htmlFor='password'>Password</Form.Label>
                            <InputGroup>
                            <Form.Control value={userFormData.password} id='password' name='password' type={seePassword1 ? 'text' : 'password'} placeholder='Enter Password' onChange={handleInputChange} />
                            <InputGroup.Text onClick={() => setSeePassword1(!seePassword1)}><i className={seePassword1 ? 'bi bi-eye-slash': 'bi bi-eye'}></i></InputGroup.Text>
                            </InputGroup>

                            <Form.Label htmlFor='confirmpassword'>Confrim Password</Form.Label>
                            <InputGroup>
                            <Form.Control value={userFormData.confirmpassword} id='confirmpassword' name='confirmpassword' type={seePassword2 ? 'text' : 'password'} placeholder='Confirm Password' onChange={handleInputChange} />
                            <InputGroup.Text onClick={() => setSeePassword2(!seePassword2)}><i className={seePassword2 ? 'bi bi-eye-slash': 'bi bi-eye'}></i></InputGroup.Text>
                            </InputGroup>

                            <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={disableSubmit} >Create New User</Button>
                        </Form>
                    </Card.Body>
                </Card>


        </>
    )
}