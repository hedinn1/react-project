import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Profile = ({openVidburdurModal}) => {
  const { userID } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const isAuthenticated = Boolean(userId);

  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('You are not authorized.')
      navigate('/');
    }
    if (isAuthenticated) {
      axios.get('http://localhost:3001/getUsers')
        .then(users => {
          console.log(users.data); // Add this line to check the received users
          setUsers(users.data);
        })
        .catch(err => console.log(err))
    }
  }, [isAuthenticated, navigate]);
  

  useEffect(() => {
    const foundUser = users.find(u => u._id === userID);
    if (foundUser) {
      setUser(foundUser);
    } else {
      console.log('User not found');
      // Optionally, you might want to redirect the user to a not-found page or handle it differently
    }
  }, [users, userID]);
  

  const skraUt = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='page-container'>
      <div className='profile-container'>
        <img src={user.imageUrls} alt=''/>
        <h1 className='font-darkblue'>@{user.username}</h1>
        <h2 className='font-darkblue font-light'><b>Land: </b>{user.country}</h2>
        <h2 className='font-darkblue font-light'><b>Skóli: </b>{user.school}</h2>
        <h2 className='font-darkblue font-light'><b>Aldur: </b>{user.age}</h2>
        <button className='border-radius-small font-darkblue border-darkblue' onClick={openVidburdurModal} color="inherit">Nýr viðburður</button><br/><br/>
        <button className='border-radius-small font-darkblue border-darkblue' onClick={skraUt} color="inherit">Skrá út</button>
      </div>
    </div>
  );
};

/* 

<td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.age}</td>
    <td>{user.bio}</td>
    <td>{user.country}</td>
    <td>{user.login}</td>
    <td>{user.password}</td>
    <td>{user.country}</td>
    <td>{user.school}</td>
    <td>{user._id}</td>

    */

export default Profile;
