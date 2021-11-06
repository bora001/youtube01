import axios from 'axios'
import React, {useState, useEffect} from 'react'

function Subscribe(props) {

const [subscribeNum, setsubscribeNum] = useState('0')
const [subscribed, setsubscribed] = useState(false)

    useEffect(() => {
        let variable = {userTo : props.userTo}
        axios.post('/api/subscribe/subscribeNum', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.subScribeNum, "num")
                    setsubscribeNum(response.data.subScribeNum)
                } else {
                    alert("failed to get subscribes")
            }
            })
        
        let subscribeInfo = { userTo: props.userTo, userFrom: props.userFrom, videos : props.videos}

        axios.post('/api/subscribe/subscribed', subscribeInfo)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data , "subscribed")
                    setsubscribed(response.data.subscribed)
                } else {
                    alert("failed to get subscribed info")
            }
        })
        

    }, [])


    const onSubscribe = () => {

        let subscriber = {
            userTo: props.userTo,
            userFrom: props.userFrom,
            videos: props.videos,
            filePath : props.videos.filePath
        }



        if (subscribed) {
            axios.post('/api/subscribe/unsubscribe', subscriber)
                .then(response => {
                    if (response.data.success) {
                        setsubscribeNum(subscribeNum - 1)
                        setsubscribed(!subscribed)
                    
                    } else {
                        alert('failed to cancel the subscribe')
                }
            })
    
        } else {
            axios.post('/api/subscribe/subscribe', subscriber)
                .then(response => {
                    if (response.data.success) {
                        console.log(response.data)
                        setsubscribeNum(subscribeNum + 1)
                        setsubscribed(!subscribed)
                    } else {
                        alert('failed to subscribe')
                }
            })
        }
}

    return (
        <div>
            <button
                style={{ backgroundColor: `${subscribed ? 'red' : 'black'}`, cursor:'pointer'}}
                onClick={onSubscribe}
                >{subscribed ? `Subscriber : ${subscribeNum}` : 'Subscribe'}</button>
        </div>
    )
}

export default Subscribe