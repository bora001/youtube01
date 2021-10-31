import React from 'react'
import CommentTwo from './CommentTwo'
import ReplyInfo from './ReplyInfo';

function CommentOne(props) {

    return (

        <div style={{}}>

            {props.userComment && props.userComment.map((info, index) => (
                <div key={index}>
                <CommentTwo videoId={props.videoId} info={info}  userComment={props.userComment} />
                <ReplyInfo replyinfo={info}/>
                </div>
            ))}

        </div>
    )
}

export default CommentOne
