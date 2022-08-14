import React, { useState } from 'react'
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import Avatar from "@mui/material/Avatar"

const Dashboard = () => {
  const [error, setError] = useState('')
  const { currentUser, setTimeActive } = useAuth()
  const history = useNavigate(); 

  async function handleLogout() {
    setError('')

    try {
      await auth.signOut()
      history('/login')
    } catch {
      setError("Failed to logout")
    }
  }

  return (
    <>
      <Card>
        <Card.Body className = "text-center">
          <h2 className = "text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Container className = "d-flex justify-content-center mb-2">
            <Avatar src={(currentUser.photoURL) ? currentUser.photoURL : "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429__340.png"} sx={{ width: 150, height: 150 }} /></Container>
            <p><strong>Email :</strong> {currentUser.email}</p>
            <strong>Name :</strong> {(currentUser.displayName) ? currentUser.displayName : ''}
          
          <Link to="./update-profile" className = "btn btn-primary w-100 mt-3">Update Profile</Link>
        </Card.Body>
      </Card>
      <div className = "w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>Log Out</Button>       
      </div>
    </>
  )
}

export default Dashboard