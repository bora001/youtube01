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
    const [ReplyComment, setReplyComment] = useState([])
    // const [CommentInfo, setCommentInfo] = useState('')
    // const [userComment, setuserComment] = useState('')
    const ref = useRef()

    const [Reply, setReply] = useState(false)
    const [ReplyInfo, setReplyInfo] = useState([])

    const onReply = (event) => {
        event.preventDefault()
        setReply(!Reply)
        console.log(props.info._id)
    }

    useEffect(() => {
        getComments()
    }, [])

// console.log(ReplyComment, "replycommit")
    function getComments() {
        // console.log(videoId, "vidid")
        
        const variable = {
            postId: videoId
        }
        axios.post('/api/comment/getReplyComment', variable)
            .then(response => {
                if (response.data.success) {
                    // console.log("rest", response.data.replys)
                    // setReplyComment(response.data.replys)
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
            replyTo: replyTo,
            content: InputValue,
            writer: user.userData._id,
            postId: videoId
        }

        axios.post('/api/comment/saveReplyComment', variable)
            .then(response => {
                if (response.data.success) {
                    // setReplyComment(response.data.comments.reply)
                    // getComments()
                    setReplyComment(response.data.reply)
                    // setCommentInfo(response.data.result)
                } else {
                    alert("failed to save your comment, try again")
                }
            })
        
        ref.current.value = ''
    }

// console.log("props.info", props.info)

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
