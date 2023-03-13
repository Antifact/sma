import React, { useState } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from '../../utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log("User not found");
        return;
    }
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (passwordMatch) {
      console.log("Login successful!");
        navigate("/");
    } else {
      console.log("Invalid password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Login</button>
    </form>
  );
};