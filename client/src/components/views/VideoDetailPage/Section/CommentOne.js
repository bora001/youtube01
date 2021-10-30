import React from 'react'
import CommentTwo from './CommentTwo'
function CommentOne(props) {

    console.log("com1 vid", props.videoId)
    return (
        <div style={{}}>

            {props.userComment && props.userComment.map((info, index) => (
                <CommentTwo videoId={props.videoId} info={info} key={index} userComment={props.userComment}/>
            ))}

        </div>
    )
}

export default CommentOne
