import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from '../../utils/firebase';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const usersRef = collection(db, "users");

      const snapshot = await usersRef.get();
      const userId = snapshot.docs.length + 1;

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
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;