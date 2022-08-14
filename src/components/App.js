import React, {useState, useEffect} from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../context/AuthContext"
import SignUp from "./SignUp"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import Dashboard from "./Dashboard"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"

function App() {

    const [currentUser, setCurrentUser] = useState(null)
    const [timeActive, setTimeActive] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
        })
    }, [])

    return (
        <AuthProvider>
            <Container className = "d-flex align-items-center justify-content-center" 
            style = {{minHeight: "100vh"}}
            >
                <div className = "w-100" style = {{maxWidth: "400px"}}>
                    <Router>
                        <AuthProvider value = {{currentUser, timeActive, setTimeActive}}>
                            <Routes>
                                <Route path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>} />
                                <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
                                <Route path = "/signup" element = {<SignUp />} />
                                <Route path = "/login" element = {<Login />} />
                                <Route path = "/forgot-password" element = {<ForgotPassword />} />
                            </Routes>
                        </AuthProvider>
                    </Router>
                </div>
            </Container>
        </AuthProvider>
    )
}

export default App
