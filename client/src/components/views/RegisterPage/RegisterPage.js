import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import "./RegisterPage.css"


function RegisterPage(props) {
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        if (Password !== ConfirmPassword) {
            return alert('incorrect password, try again')
        }

        let body = {
            email: Email,
            password: Password,
            name : Name
        }


        dispatch(registerUser(body)).then(response => {
                if (response.payload.success) {
                props.history.push('/login')
                } else {
                    alert("Failed to sign up :/")
            }
        })
    }

    return (
        <div>
            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}
                onSubmit={onSubmitHandler}>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>ConfirmPassword</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
