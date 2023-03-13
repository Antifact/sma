import React, { useState } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from '../../utils/firebase';


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
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
      // Perform any additional actions, such as updating the Redux store or redirecting to a new page.
    } else {
      console.log("Invalid password");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Login</button>
    </form>
  );
};