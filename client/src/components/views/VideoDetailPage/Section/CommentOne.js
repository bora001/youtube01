import React, {useState} from 'react'
import CommentTwo from './CommentTwo'
function CommentOne(props) {

    return (
        <div style={{border:'3px solid blue'}}>

            {props.userComment && props.userComment.map((info, index) => (
                <CommentTwo info={info} key={index}/>
            ))}

        </div>
    )
}

export default CommentOne
