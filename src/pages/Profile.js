import useAuth from "../utils/firebase";

const Profile = () => {

  const currentUser = useAuth();

  return (
    <>
      <h1>Welcome {currentUser?.email}</h1>

      <p>
        {currentUser?.uid}


      </p>
    </>
  )
}

export default Profile;