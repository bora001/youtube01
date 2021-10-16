import axios from 'axios'
import React, {useState, useEffect} from 'react'

function Subscribe(props) {

const [subscribeNum, setsubscribeNum] = useState('0')


    useEffect(() => {
        let variable = {userTo : props.userTo}
        axios.post('/api/subscribe/subscribeNum', variable)
            .then(response => {
                if (response.data.success) {
                    setsubscribeNum(response.data.subscribeNum)
                
                } else {
                    alert("failed to get subscribes")
            }
        })
        
    }, [])


    const DidSubscribe = () => {
    console.log("i did subsccribe")
}

    return (
        <div>
            <button
                style={{ backgroundColor: 'red' }}
                onClick={DidSubscribe}
            >Subscribe</button>
        </div>
    )
}

export default Subscribe