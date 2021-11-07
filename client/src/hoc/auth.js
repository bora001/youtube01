import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {

    function AuthCheck(props) {

        const dispatch = useDispatch();
        
        useEffect(() => {
            dispatch(authUser())
                .then(response => {
                    console.log("hoc auth", response)
                    if (!response.payload.isAuth) {
                        //no login
                        if (option) {
                            alert("Please login, ID : test@email.com / PW : test1 \n\n✨you can register new one!")
                            props.history.push('/')
                        }
                    
                    } else {
                        // did login
                        if (adminRoute && !response.payload.isAdmin) {
                            //not admin
                            props.history.push('/')
                        } else {
                            if (option === false) {
                                props.history.push('/')
                            }
                        }
                
                    }
                })

        }, [])
           
            return (
                <SpecificComponent />
            )
    }

    return AuthCheck
}
