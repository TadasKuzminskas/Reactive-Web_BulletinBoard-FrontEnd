import axios from "axios";
import React, { useState } from "react";
import "./Popup.css"
import { fetchRefreshToken } from '../../../helpers/RefreshTokenInitializer'


function FollowedPopup(props) {


    function unfollow(person) {
        console.log("Unfollow nutton pressed.")

        axios.delete(`http://localhost:9090/v1/friend/${person.id}`).then(
            props.setFollowed(props.followed.filter(obj => {
                return obj.username !== person.username
            }))
        ).catch(error => fetchRefreshToken(error))
    }

    return ( props.trigger ) ? (
        <div className="popup">
            <div className="popup-inner">
            <button className="close-btn" onClick={() => {props.setTrigger(false);}}>X</button>
            <h1>Followed</h1>
            
            <div>
                {props.followed.map((person) => (
                    
                    <div key={person.id}>
                        <br></br>
                        <div class="add-selection" style={{height : 30, width : 150}}>
                        <text >{person.friend}</text>
                        <text class="unfollow-button" onClick={() => unfollow(person)}>unfollow</text>
                        </div>
                    </div>
                    
                ))}
            </div>
            </div>

        </div>

    ) : "";
}


export default FollowedPopup;