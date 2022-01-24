import React, { useState } from 'react'
import { Card, Button, Alert, Figure } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Authcontext'

const Home = () => {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { currentuser, logout } = useAuth()
    console.log(currentuser);
    const handleLogout = async () => {
        setError('')
        try {
            await logout()
            navigate('/login')

        } catch {
            setError("Please Try Again to logout !")
        }
    }
    return (
        <>
            <Card>
                <Card.Body style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <h2 className="text-center mb-4">Profile</h2>
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            style={{borderRadius:"50%"}}
                            alt="171x180"
                            src={currentuser.photoURL}
                        />
                    </Figure>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {currentuser.email && <p><strong>Email: </strong>{currentuser.email}</p>}
                    {currentuser.displayName && <p><strong>Name: </strong>{currentuser.displayName}</p>}
                    
                    <Link to='/update-profle' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' style={{ textDecoration: 'none' }} onClick={handleLogout}><h4>Logout</h4></Button>
            </div>
        </>
    )
}

export default Home
