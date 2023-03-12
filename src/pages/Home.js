import React from 'react';
import NavBar from '../components/common/NavBar';
import AddTask from '../components/task/AddTask';
import TaskList from '../components/task/TaskList';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const Home = () => {

  const [user] = useAuthState(auth);

  

  return (
    <>
      <NavBar />
      <TaskList />
      { user ? <AddTask /> : '' }
      { user ? console.log(user) : console.log('not logged in') }
    </>
  )
}

export default Home;