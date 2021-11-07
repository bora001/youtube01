import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

function SubscriptionPage(props) {

    const [Subscriptions, setSubscriptions] = useState([])
    
    useEffect(() => {
        getSubscribe()
    }, [])


    function getSubscribe() {
          axios.get("/api/subscribe/subscription", {userFrom : document.cookie.split(' = ')[1]})
            .then((response) => {
                if (response.data.success) {
                    setSubscriptions(response.data.videos)
            } else {
                alert("failed to get videos");
            }
        });
    }

    function unSubscribe(video){

          let subscriber = {
            userTo: video.userTo,
            userFrom: video.userFrom,
            videos: video.videos,
            filePath : video.filePath
        }

        axios.post('/api/subscribe/unsubscribe', subscriber)
            .then(response => {
                if (response.data.success) {
                    getSubscribe()
                
                } else {
                    alert('failed to cancel the subscribe')
                }
            })
       
    }
    
    return (
        <div style={{width:'80%',margin:'0 auto'}}>
    
            <h2>Subscription</h2>
            <hr />
            {Subscriptions && Subscriptions.map((video, index) => (
                <div key={index}>
                    <img src={`http://localhost:5000/${video.videos.thumbnail}`}/>
                    <p>Title : {video.videos.title}</p>
                    <p>Description : {video.videos.description}</p>
                    <button onClick={() => unSubscribe(video)} value={{video}} style={{marginBottom:'3%'}}>unSubscribe</button>
                </div>
            ))}

        </div>
    )
}

export default withRouter(SubscriptionPage);
