import axios from "axios";
import React from "react";
import "./Popup.css"
import { useState } from 'react';

function FollowPopup(props) {

    const [following, setFollowing] = useState([]);

    function setUserList(event) {
        console.log(event)
        axios.get(`http://localhost:9090/v1/user/starts/${event}`).then(response => {
            console.log(response.data)

            const users = response.data.filter(person => {
                  return person.username !== props.activeUser
                })
            setFollowing(users)
        })
    }

    function clearList(event) {
        if (event === null) {
            setFollowing([])
        }
    }

    function followPerson(personToAdd) {
        const person = {
            username: props.activeUser,
            friend: personToAdd
        }

        console.log("Person " + personToAdd + " added to " + props.activeUser)
        console.log(person)



        axios.post("http://localhost:9090/v1/friend", person)
    }





    return ( props.trigger ) ? (
        <div className="popup">
            <div className="popup-inner">
            <button className="close-btn" onClick={() => {props.setTrigger(false); setFollowing([])}}>X</button>
            <h2>Search for users</h2>
            <input placeholder="e.g. Ted Crui.." onChange={event => {setUserList(event.target.value);  clearList(event.target.value)}}></input>
            <div>
                {following.map((person) => (
                    
                    <div key={person.id}>
                        <br></br>
                        <div class="add-selection" style={{height : 30, width : 150}}>
                        <text >{person.username}</text>
                        <text class="add-button"  onClick={() => followPerson(person.username)}>follow+</text>
                        </div>
                    </div>
                ))}
            </div>
            </div>

        </div>

    ) : "";
}


export default FollowPopup;