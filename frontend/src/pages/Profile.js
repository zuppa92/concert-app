// src/pages/Profile.js
import React from 'react';
import { useUser } from '../context/UserContextProvider';

const Profile = () => {
  const { user } = useUser();

  console.log('Profile component user:', user); // Debugging statement

  if (!user) {
    console.log('No user found, displaying Loading...');
    return <div>Loading...</div>;
  }

  console.log('User found:', user);
  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;