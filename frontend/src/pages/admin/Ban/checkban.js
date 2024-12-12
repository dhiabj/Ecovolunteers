import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Login from './components/Login';
import UserBanned from './UserBanned';

const checkBanned = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/users/userconnected', {
      headers: {
        'Authorization': localStorage.getItem('token') // Ajoutez ici votre token
      }
    });

    const data = await response.json();

    if (data.user.banned === 'banned') {
      // Rediriger vers le composant Banned
      window.location.replace('/userbanned');
    } else {
      // L'utilisateur n'est pas banni, poursuivre normalement
      // ...
    }
  } catch (error) {
    console.error(error);
  }
};


export default checkBanned;
