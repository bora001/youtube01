import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import CommentOne from './CommentOne'

function Comments(props) {

    const videoId = props.postId

    const user = useSelector(state => state.user)
    const [InputValue, setInputValue] = useState('')
    const [CommentInfo, setCommentInfo] = useState('')
    // const [userComment, setuserComment] = useState('')


    // useEffect(() => {
        // setuserComment(props.userComment)
    // }, [])


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
        console.log(InputValue)

    }
    
    return (
        <div>
            {/* {userComment && userComment.map((info, index) => (
                <div key={index}>
                    <Comment
                        avatar={<Avatar size="small" icon={<UserOutlined />} />}
                        author={`${info.writer.name}`}
                        content={<p>{info.content}</p>}
                    />
                </div>
            ))} */}
            <CommentOne userComment={props.userComment}/>
            {/* {WriteComment} */ }
            <form onSubmit={onComment}style={{ display:'flex', flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start', width:'100%',height:'50px'}}>
                <input onChange={InputComment}/>
            <button onClick={onComment}>submit</button>
            </form>
        </div>
    )
}

export default Comments
