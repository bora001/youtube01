import React, { useState, useEffect, useRef } from 'react'
import {useSelector} from 'react-redux'
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'

function CommentTwo(props) {    

    const videoId = props.videoId
    const replyTo = props.info._id
    const user = useSelector(state => state.user)
    const [InputValue, setInputValue] = useState('')
    const [CommentInfo, setCommentInfo] = useState('')
    const [userComment, setuserComment] = useState('')
    const ref = useRef()

    const [Reply, setReply] = useState(false)

    const onReply = (event) => {
        event.preventDefault()
        setReply(!Reply)
        console.log(props.info._id)
    }

    useEffect(() => {
        getComments()
    }, [])


    function getComments() {

        // const variable = { _Id: replyTo, reply: };

        // axios.post('/api/comment/getReplyComment', variable)
        //     .then(response => {
        //         if (response.data.success) {
        //             // setuserComment(response.data.comments)
        //         } else {
        //             alert("failed to save your comment, try again")
        //         }
        //     })
    }

    const InputComment = (event) => {
        setInputValue(event.target.value)
    }

    

    const onComment = (event) => {
        event.preventDefault()

        const variable = {
            replyTo: replyTo,
            content: InputValue,
            writer: user.userData._id,
            postId: videoId
        }

        axios.post('/api/comment/saveReplyComment', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.reply)
                    // setCommentInfo(response.data.result)
                } else {
                    alert("failed to save your comment, try again")
                }
            })
        
        getComments()
        ref.current.value = ''
    }

    return (
        <div style={{}}>
                <div>
                    <Comment
                        actions={[<span key="comment-nested-reply-to" onClick={onReply}> Reply to </span>]}
                        avatar={<Avatar size="small" icon={<UserOutlined />} />}
                        author={`${props.info.writer.name}`}
                        content={<p>{props.info.content}</p>}
                />
                </div>

            {Reply && 
                <form onSubmit={onComment} style={{ marginLeft: '10%', height: 'inherit', flexDirection: 'row', justifyContent: 'initial', alignItems: 'initial' }}>
                <textarea style={{width:'30%', height:'50px'}} ref={ref} onChange={InputComment}/>
                <button onClick={onComment} style={{backgroundColor:'dodgerblue'}}>Comment</button>
                </form>
            }
            
        </div>
    )
}

export default CommentTwo
