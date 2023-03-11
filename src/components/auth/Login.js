import React, { useState } from 'react';
import { Form, InputGroup, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/AddTask.css';
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (email === "" || password === "") {
            toast.error('Email and password are required!');
        }

        try {
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                navigate("/");
            })
        } catch (err) {
            if (err.code === 'auth/invalid-email') {
                toast.error('Invalid email!');
            }
            if (err.code === 'auth/user-not-found') {
                toast.error('Please check your email!');
            }
            if (err.code === 'auth/wrong-password') {
                toast.error('Please check your password!');
            }
            if (err.code === 'auth/too-many-requests') {
                toast.error('Too many attempts were made, please try again later!');
            }
        }
    };

    return (
        <>
            <div id='mainDiv'>
                <form>
                    <Form.Group className="mb-3">
                        <h1>Welcome</h1>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <InputGroup>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div>
                        <p className="forgotPass">
                            <Link to="/reset" className="forgotPassText">Forgot Your Password?</Link>
                        </p>

                        <p>
                            <Button className="loginBtn" variant="outline-info" onClick={handleSubmit}>
                                Login
                            </Button>

                            <br /> or <br /> 

                            <Link className="signUp" to="/register" >Sign Up</Link>

                            
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}