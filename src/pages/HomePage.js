import { useEffect, useState } from 'react';
import api from '../api/baseURL';
import axios from 'axios';
import Posts from './components/Posts';


function HomePage() {

  var activeUser = localStorage.getItem("username")

  function logout() {
    console.log("logout button pressed.")

    localStorage.setItem("username", "")
    localStorage.setItem("token", "");

    window.location.href = '/login'

  }


    return (
      <div>
        <div class="card">
          <h1> Home Page </h1>
          <h3>Logged in as: {activeUser} </h3>
        </div>
        <div class="card" onClick={() => logout()}><h4>Log out</h4></div>
         <Posts activeUser={activeUser}/>
      </div>
    );
  }
  
  export default HomePage;
  