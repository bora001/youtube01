import axios from 'axios'
import React, { useState } from 'react'

function Comment() {

    const [InputValue, setInputValue] = useState('')
    
    const InputComment = (event) => {
        setInputValue(event.target.value)
    }

    const onComment = (event) => {
        event.preventDefault()

        const variable = {
            comment : InputValue,
        }
        axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                
                } else {
                    alert("failed to save your comment, try again")
            }
        })
        console.log(InputValue)
    }

    return (
        <div>
            <form onSubmit={onComment}style={{ display:'flex', flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start', width:'100%',height:'50px'}}>
                <input onChange={InputComment}/>
            <button onClick={onComment}>submit</button>
            </form>
        </div>
    )
}

export default Comment
