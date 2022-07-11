import React, { useState } from "react";
import axios from "axios";
import { setAuthToken } from "../helpers/setAuthToken"

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [invalidCredentials, setInvalidCredentials] = useState(false)

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const routeRegistration = () => {
    window.location.href = '/registration'
  }
  


  const handleSubmit = () => {
    //reqres registered sample user
    const loginPayload = {
      username: username,
      password: password
    }

    console.log(loginPayload)


    axios.post("http://localhost:9090/v1/token", loginPayload)
      .then(response => {
        //get token from response
        const token = response.data.jwt;

        //set JWT token to local
        localStorage.setItem("token", token);

        console.log(token)

        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        window.location.href = '/'

      })
      .catch(err => {
          console.log(err)
          setInvalidCredentials(true)
      });
  };

  return (
    <div>
      <h1 style={{color : 'white'}}>Bulletin Board</h1>
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const [username, password] = event.target.children;
        handleSubmit(username, password);
      }}
    >
      <label for="username" style={{color : 'white'}}>Username</label><br />
      <input type="username" id="username" name="username" maxLength={30} onChange={handleUsernameChange}/><br />
      <label for="password" style={{color : 'white'}}>Password</label><br />
      <input type="password" id="password" name="password" maxLength={30} onChange={handlePasswordChange}/><br></br>
      {/* <input type="submit" value="Submit"/> */}
      <button class="card" style={{width : 75}} onClick={handleSubmit}>Login</button>
      <br></br>
      <button class="card" style={{width : 75}} onClick={routeRegistration}>Register</button>
    </form>
    {invalidCredentials && <h3 style={{color : 'white'}}>Invalid Credentials.</h3>}

    </div>
  );
}
export default Login