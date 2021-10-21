import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

function SubscriptionPage(props) {

    const [Subscriptions, setSubscriptions] = useState([])
    
    useEffect(() => {

        axios.get("/api/subscribe/subscription", {userFrom : document.cookie.split(' = ')[1]})
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.videos, "test")
                    setSubscriptions(response.data.videos)
            } else {
                alert("failed to get videos");
            }
        });

    }, [])


console.log(Subscriptions)

    
    return (
        <div style={{width:'80%',margin:'0 auto'}}>
    
            <h2>Subscription</h2>
            <hr />
            {Subscriptions && Subscriptions.map((video, index) => (
                <div key={index}>
                    <img src={`http://localhost:5000/${video.videos.thumbnail}`}/>
                    <p>Title : {video.videos.title}</p>
                    <p>Description : {video.videos.description}</p>
                </div>
            ))}

        </div>
    )
}

export default withRouter(SubscriptionPage);
