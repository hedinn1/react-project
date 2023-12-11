import React, { useEffect, useState } from 'react';

import logo from './logo.svg'
import { Link } from 'react-router-dom';
import axios from 'axios';


const Navbar = ({ openLoginModal, openLeitModal, openVidburdurModal }) => {

  const userId = localStorage.getItem('userId');
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
        .then(users => {
          console.log(users.data); // Add this line to check the received users
          setUsers(users.data);
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <header>
      <div>
      <div>
        <Link to='/'>
        <img src={logo} alt="Logo" className='logo' />
        </Link>
      </div>
      <div className='flex gap-small'>
        
        <button className='border-radius-small font-darkblue border-darkblue' onClick={openLeitModal} color="inherit">Leita</button>
        {userId == null ? (
          <button className='border-radius-small font-darkblue border-darkblue' onClick={openLoginModal} color="inherit">Skrá inn</button>
        ) : (
          <Link className='border-radius-large border-darkblue' key={user._id} to={`/profile/${userId}`}>
            <button className='border-radius-small font-darkblue border-darkblue max-height'>Prófíll</button>
          </Link>
        )}
      </div>
      </div>
    </header>
  );
};
export default Navbar;