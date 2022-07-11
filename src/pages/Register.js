import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"

function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [formError, setFormError] = useState(false)
  const [lengthError, setLenghtError] = useState(false)

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

    if (username.length < 4 || password.length < 7 || name.length < 3 || lastName.length < 3) {
      setFormError(false)
      setLenghtError(true)
    } else {

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

    const response = await axios.post("http://localhost:9090/v1/userRegistration", userToRegister)
    
    console.log(response)

    if (response.data > 0) {
      await axios.post("http://localhost:9090/v1/friend", person)
      window.location.href = '/login'
    } else {
      setFormError(true)
      setLenghtError(false)
      console.log("Bad reponse")
      console.log(formError)
    }

  }
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
      <br></br>
    </form>
    <button class="card" style={{width : 75}} onClick={handleSubmit}>Register</button>
    <button class="card" style={{width : 75}} onClick={backButton}>Back</button>
    <div>
    </div>
    {formError && <h3 style={{color : 'white'}}>Username exists.</h3>}
    {lengthError && <h3 style={{color : 'white'}}>Inputs are too short</h3>}
    </div>
  );
}
export default Register