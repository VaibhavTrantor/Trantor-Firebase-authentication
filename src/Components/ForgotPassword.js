import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/Authcontext'

const ForgotPassword = () => {
    const emailRef = useRef()
    const [error, setError] = useState()
    const [variant, setVariant] = useState('danger')
    const {resetpassword} = useAuth()
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
           await resetpassword(emailRef.current.value)
           setVariant('success')
           setError("We have mailed your password reset link !")
        } catch  {
            setError('Email does not exist !')
        }
       
    }
    return (
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Reset Password</h2>
                {error && <Alert variant={variant}>{error}</Alert>}
                <Form onSubmit={handlesubmit}>
                    <Form.Group id="email " className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    
                    <Button  type='submit' className='w-100  mt-3'>Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-4">
                 <h5><Link to='/login' style={{textDecoration:'none'}}>Login</Link></h5>
                </div>
                <div className="w-100 text-center mt-3">
                    Don't have an account ? <Link to='/signup'>SignUp</Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ForgotPassword
