import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Authcontext'


const Signup = () => {
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmRef = useRef()
    const [error, setError] = useState()
    const {signup,googlelogin,twitterlogin,gitlogin} = useAuth()
    const handlegoogle =async()=>{
        setError('')
        try {
            await googlelogin()
            navigate('/')
        } catch  {
            setError('Error in SignUp !')
        }
    }
    const handlegit =async()=>{
        setError('')
        try {
            await gitlogin()
            navigate('/')
        } catch  {
            setError('Error in SignUp !')
        }
    }
    const handletwitter =async()=>{
        setError('')
        try {
            await twitterlogin()
            navigate('/')
        } catch  {
            setError('Error in SignUp !')
        }
    }
    const handlesubmit = async(e)=>{
        e.preventDefault()
        if (passwordRef.current.value !== passwordconfirmRef.current.value) {
            return setError('Password do not match')
        }
        try {
            console.log("running again");
            setError("")
            setLoading(true)
            await signup(emailRef.current.value,passwordRef.current.value)
            navigate('/')
            
        } catch  {
            setError("User Already Exists !")
        }
        setLoading(false)
    }
    return (
        <Card>
            <Card.Body>
            <h2 className='text-center mb-4'>SignUp</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handlesubmit}>
                <Form.Group id="email " className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password " className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm" className='mb-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' ref={passwordconfirmRef} required />
                </Form.Group>
                <Button disabled={Loading} type='submit' className='w-100 mt-3'>SignUp</Button>
            </Form>
            <div className='mt-3' style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
                <img onClick={handlegoogle} src="../images/google.png" alt="" style={{height:70,cursor:'pointer'}} />
                <img onClick={handletwitter} src="../images/twitter.png" alt="" style={{height:50,cursor:'pointer'}} />
                <img onClick={handlegit} src="../images/git.png" alt="" style={{height:50,cursor:'pointer'}} />
            </div>
            <div className="w-100 text-center mt-3">
                Already have an account ? <Link to='/login'>Log In</Link>
            </div>
            </Card.Body>
        </Card>
    )
}

export default Signup
