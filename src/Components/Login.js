import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Authcontext'

const Login = () => {
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState()
    const { login,googlelogin,gitlogin,twitterlogin } = useAuth()
    const handlegoogle =async()=>{
        setError('')
        try {
            await googlelogin()
            navigate('/')
        } catch  {
            setError('Email already exist with other authentication !')
        }
    }
    const handlegit =async()=>{
        setError('')
        try {
            await gitlogin()
            navigate('/')
        } catch  {
            setError('Email already exist with other authentication !')
        }
    }
    const handletwitter =async()=>{
        setError('')
        try {
            await twitterlogin()
            navigate('/')
        } catch  {
            setError('Email already exist with other authentication !')
        }
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value,passwordRef.current.value)
            navigate('/')
            
        } catch  {
            setError("Invalid Credentials !")
        }
        setLoading(false)
    }
    return (
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Login</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <div className='mt-3' style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                <img onClick={handlegoogle} src="../images/google.png" alt="" style={{height:70,cursor:'pointer'}} />
                <img onClick={handletwitter} src="../images/twitter.png" alt="" style={{height:50,cursor:'pointer'}} />
                <img onClick={handlegit} src="../images/git.png" alt="" style={{height:50,cursor:'pointer'}} />
            </div>
                <Form onSubmit={handlesubmit}>
                    <Form.Group id="email " className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password " className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={Loading} type='submit' className='w-100  mt-3'>Login</Button>
                </Form>
                <div className="w-100 text-center mt-4">
                 <Link to='/forgot-password'>Forgot Password ?</Link>
                </div>
                
                <div className="w-100 text-center mt-3">
                    Don't have an account ? <Link to='/signup'>SignUp</Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Login
