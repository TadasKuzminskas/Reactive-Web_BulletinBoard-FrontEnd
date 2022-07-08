import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"

function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  const handleSubmit = async () => {

    const userToRegister = {
        username: username,
        name: name,
        lastname: lastName,
        password: password,
    }

    const person = {
        username: username,
        friend: username
    }

    await axios.post("http://localhost:9090/v1/userRegistration", userToRegister)
    await axios.post("http://localhost:9090/v1/friend", person)
    window.location.href = '/login'
    
  }

  const backButton = () => {
    window.location.href = '/login'
  }
  

  return (
    <div>
      <h1 style={{color : 'white'}}>Bulletin Board</h1>
      <h2 style={{color : 'white'}}>Registration</h2>
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const [username, password] = event.target.children;
        handleSubmit(username, password);
      }}
    >
      <label for="username" style={{color : 'white'}}>Username</label><br />
      <input type="username" id="username" name="username" onChange={handleUsernameChange}/><br />
      <label for="name" style={{color : 'white'}}>Name</label><br />
      <input type="name" id="name" name="name" onChange={handleNameChange}/><br />
      <label for="lastname" style={{color : 'white'}}>Lastname</label><br />
      <input type="lastname" id="lastname" name="lastname" onChange={handleLastNameChange}/><br />
      <label for="password" style={{color : 'white'}}>Password</label><br />
      <input type="password" id="password" name="password" onChange={handlePasswordChange}/><br></br>
      {/* <input type="submit" value="Submit"/> */}
      <button class="card" style={{width : 75}} onClick={() => handleSubmit}>Register</button>
      <button class="card" style={{width : 75}} onClick={() => backButton}>Back</button>
    </form>
    </div>
  );
}
export default Register