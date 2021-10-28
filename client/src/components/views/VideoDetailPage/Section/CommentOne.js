import React, {useState} from 'react'
import CommentTwo from './CommentTwo'
function CommentOne(props) {

    return (
        <div style={{}}>

            {props.userComment && props.userComment.map((info, index) => (
                <CommentTwo info={info} key={index}/>
            ))}

        </div>
    )
}

export default CommentOne
