import React, {useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import "./LandingPage.css"
import VideoSection from './VideoSection/VideoSection'
let status = {
        loginStatus:false
    };

function LandingPage(props) {

    
    useEffect(() => {

        axios.get(`/api/auth`)
            .then(response => {
            console.log("landing get auth",response)
            if (response.data.isAuth) {
                status.loginStatus = true
            } else {
                status.loginStatus = false
            }
        })

        
    }, [])
    
    const onLogoutHandler = () => {
        axios.get(`/api/logout`)
        .then(response => {
            if (response.data.success) {
                props.history.push("/login")
            } else {
                alert("failed to logout")
            }
        })

    }

    return (
        <div className="landing_page">
            <div className="intro_box">
                <h2>Thank you for visiting !</h2>
                <div className="btn_box">
                    {status.loginStatus
                        ?<div>
                            <button onClick={onLogoutHandler}>LOGOUT</button>
                            <button><a href="/fav">FAVORITE</a></button>
                        </div>
                        :
                        <div >
                            <button><a href="/register">REGISTER</a></button>
                            <button><a href="/login">LOGIN</a></button>
                        </div>}
                </div>
            </div>
            <VideoSection />
        </div>
    )
}

export default withRouter(LandingPage)