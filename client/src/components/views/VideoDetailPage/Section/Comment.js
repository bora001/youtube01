import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import {useSelector} from 'react-redux'
import CommentOne from './CommentOne'

function Comments(props) {

    const videoId = props.postId

    const user = useSelector(state => state.user)
    const [InputValue, setInputValue] = useState('')
    const [CommentInfo, setCommentInfo] = useState('')
    const [userComment, setuserComment] = useState('')

    const ref = useRef()

    useEffect(() => {
        getComments()
    }, [])


    function getComments() {

        const variable = { videoId: videoId };

        axios.post('/api/comment/getComment', variable)
            .then(response => {
                if (response.data.success) {
                    setuserComment(response.data.comments)
                } else {
                    alert("failed to save your comment, try again")
                }
            })
    }

    const InputComment = (event) => {
        setInputValue(event.target.value)
    }

    const onComment = (event) => {
        event.preventDefault()

        const variable = {
            content: InputValue,
            writer: user.userData._id,
            postId: videoId
        }

        axios.post('/api/comment/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    setCommentInfo(response.data.result)
                } else {
                    alert("failed to save your comment, try again")
                }
            })
        
        getComments()
        ref.current.value = ''
    }
    
    return (
        <div>
            <CommentOne userComment={userComment}/>
            <form onSubmit={onComment} style={{ display:'flex', flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start', width:'100%',height:'50px'}}>
                <input type="text" ref={ref} onChange={InputComment}/>
            <button type="submit" onClick={onComment}>submit</button>
            </form>
        </div>
    )
}

export default Comments