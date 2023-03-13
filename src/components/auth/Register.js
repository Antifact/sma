import React, { useState } from "react";
import { collection, addDoc, where, query, getDocs, getDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from '../../utils/firebase';
import { Firestore } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(db);

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username || "email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log("Username or email already exists!");
            return;
        }

        const userId = querySnapshot.docs.length + 1;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: userId,
            username,
            email,
            password: hashedPassword,
        };

        await addDoc(usersRef, newUser);

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        alert("Registration successful!");

    } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </label>
        <br />
        <label>
            Email:
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </label>
        <br />
        <label>
            Password:
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </label>
        <br />
        <label>
            Confirm Password:
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        </label>
        <br />
        <button type="submit">Register</button>
        </form>
    );
};

export default Register;