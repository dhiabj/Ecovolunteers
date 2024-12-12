import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BanUser from '../Ban/apiban';
import { toast } from 'react-toastify';
import './user.css';



function User() {
  const { username } = useParams(); // Extract the username from the URL

  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:5000/api/users/a/user/${username}`);
      const data = await response.json();
      setUser(data);
    }

    fetchUser();
  }, [username]);

  const handleDelete = async () => {
    if (user.role === 'admin') {
      alert('You cannot delete an admin user.');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/users/delete/user/${username}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data.message);
      toast.success('deleted successfully!');
      // Redirect to another page after successful deletion
    } catch (error) {
      console.error(error);
    }
  }


  return (


    <div className='user-details'>
      <img
        src={`http://localhost:5000/uploads/${user.img}`}
        alt=""
      />
      <h1 className='user-details-heading'>{user.firstname} {user.lastname}</h1>

      <div className='user-details-content'>
        <div className='user-details-group'>
          <div className='user-details-item'>
            <label>Username:</label>
            <p>{user.username}</p>
          </div>

          <div className='user-details-item'>
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
        </div>

        <div className='user-details-group'>
          <div className='user-details-item'>
            <label>Address:</label>
            <p>{user.address}</p>
          </div>




          <div className='user-details-item'>
            <label>Birthday:</label>
            <p>{new Date(user.birthday).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Render other user details here */}

      {user.banned === 'active' ? (
        <BanUser username={username} isAlreadyBanned={true} />
      ) : (
        <BanUser username={username} isAlreadyBanned={false} />
      )}

      <button className='user-details-delete-button' onClick={handleDelete}>Delete User</button>
    </div>
  );

}

export default User;
