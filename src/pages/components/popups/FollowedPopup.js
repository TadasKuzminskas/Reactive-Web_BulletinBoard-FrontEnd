import React, { useState } from "react";
import "./Popup.css"


function FollowedPopup(props) {


    

    return ( props.trigger ) ? (
        <div className="popup">
            <div className="popup-inner">
            <button className="close-btn" onClick={() => {props.setTrigger(false);}}>X</button>
            <h1>Popup</h1>
            
            <div>
                {props.followed.map((person) => (
                    <div >
                        <br></br>
                        <div class="add-selection" style={{height : 30}}>
                        <text >{person.friend}  </text>
                        </div>
                    </div>
                ))}
            </div>
            </div>

        </div>

    ) : "";
}


export default FollowedPopup;