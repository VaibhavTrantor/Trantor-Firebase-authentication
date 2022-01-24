import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Authcontext'


const UpdateProfile = () => {
    const [Loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordconfirmRef = useRef()
    const [error, setError] = useState()
    const { currentuser, updatepassword1, updateemail1 } = useAuth()
    const handlesubmit = async(e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordconfirmRef.current.value) {
            return setError('Password do not match')
        }
       

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentuser.email) {
            promises.push(updateemail1(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatepassword1(passwordRef.current.value))
        }
        Promise.all(promises)
            .then(() => {
                navigate('/')
            })
            .catch(() => {
                setError('Error while updating the data')
            })
            .finally(() => {
                setLoading(false)
            })

    }
    return (
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Update Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handlesubmit}>
                    <Form.Group id="email " className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} defaultValue={currentuser.email} required />
                    </Form.Group>
                    <Form.Group id="password " className='mb-3'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} />
                    </Form.Group>
                    <Form.Group id="password-confirm" className='mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref={passwordconfirmRef} />
                    </Form.Group>
                    <Button disabled={Loading} type='submit' className='w-100 mt-3'>Update</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <h6><Link to='/' style={{ textDecoration: 'none' }}>Cancel</Link></h6>
                </div>
            </Card.Body>
        </Card>
    )
}

export default UpdateProfile
