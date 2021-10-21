import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

function SubscriptionPage(props) {
        // let variable = {userTo : props.userTo}
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

    
    // const SubscriptionInfo = Subscriptions.map((subscribe, index) => {
    //     return <div>
    //         <p>test</p>
    //         </div>
    // })
    
    return (
        <div style={{width:'80%',margin:'0 auto'}}>
    
            <h2>Subscription</h2>
            <hr />
            {Subscriptions && Subscriptions.map((video, index) => (
                <div key={index}>
                    <p></p>
                </div>
            ))}

        </div>
    )
}

export default withRouter(SubscriptionPage);
