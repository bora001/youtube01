import React, {useState,useEffect,useRef} from 'react'
// import CommentTwo from './CommentTwo'
import {useSelector} from 'react-redux'
import ReplyInfo from './ReplyInfo';
import axios from 'axios'
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import LikeButton from './LikeButton';

function CommentOne(props) {

const [userComment, setuserComment] = useState([])
    const videoId = props.videoId
    const [Reply, setReply] = useState(false)
    const ref = useRef()
    const user = useSelector(state => state.user)
    const [InputValue, setInputValue] = useState('')
    const [ReplyComment, setReplyComment] = useState([])
    const [clicked, setclicked] = useState('')    

    useEffect(() => {
        getComments()
    }, [userComment])

    const onReply = (event) => {
        event.preventDefault()
        
        if (clicked !== '' && Reply == true) {
            console.log("already clicked")
            setReply(true)
            setclicked(event.target.attributes.replyid.nodeValue)
        } else if (clicked == '' && Reply == false) {
            console.log("never clicked")
            setReply(!Reply)
            setclicked(event.target.attributes.replyid.nodeValue)
        }
    }

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
            replyTo: clicked,
            content: InputValue,
            writer: user.userData,
            postId: videoId
        }

        axios.post('/api/comment/saveReplyComment', variable)
            .then(response => {
                if (response.data.success) {
                    setReplyComment(response.data.reply)
                } else {
                    alert("failed to save your comment, try again")
                }
            })
        getComments()
        ref.current.value = ''

    }

    return (

        <div style={{}}>
            
            {userComment && userComment.map((info, index) => (
                <div key={index}>
                <Comment
                    actions={[[<LikeButton />],[<span key="comment-nested-reply-to" replyid={info._id} onClick={onReply}> Reply to </span>]]}
                    avatar={<Avatar size="small" icon={<UserOutlined />} />}
                    author={`${info.writer.name}`}
                    content={<p>{info.content}</p>}
                />

                <ReplyInfo replyinfo={info} />
                    
                    {clicked && clicked == info._id ?
                        Reply &&
                        <form onSubmit={onComment} style={{ marginLeft: '5%', height: 'inherit', flexDirection: 'row', justifyContent: 'initial', alignItems: 'initial' }}>
                            <textarea style={{width:'30%', height:'50px'}} ref={ref} onChange={InputComment}/>
                            <button onClick={onComment} style={{backgroundColor:'dodgerblue', cursor:'pointer'}}>Comment</button>
                        </form> : " "
                    }
                </div>
                
            ))}
        </div>
    )
}

export default CommentOne
