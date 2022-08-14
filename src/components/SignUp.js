import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase"

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { setTimeActive } = useAuth();
    const [error, setError] = useState('');
    const [Loading, setLoading] = useState(false);
    const history = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError('')
            setLoading(true)
            await createUserWithEmailAndPassword(auth ,emailRef.current.value, passwordRef.current.value)
            setTimeActive(true)
            history("/")
        } catch {
            console.error(e)
            setError("Failed to create account")
        }
        setLoading(false)
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className = "text-center mb-4">Sign Up </h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit = {handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group> 
                    <Button disabled = {Loading} type = "submit" className = "w-100 mt-3">
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className = "w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link> 
        </div>
    </>
  )
}

export default SignUp