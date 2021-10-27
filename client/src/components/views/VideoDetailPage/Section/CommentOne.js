import React, {useState, useEffect} from 'react'
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function CommentOne(props) {
    const [userComment, setuserComment] = useState('')


    useEffect(() => {
        setuserComment(props.userComment)
    }, [])

    console.log(userComment, "comm")
    


    return (
        <div style={{border:'3px solid blue'}}>
            
{userComment && userComment.map((info, index) => (
                <div key={index}>
                    <Comment
                        avatar={<Avatar size="small" icon={<UserOutlined />} />}
                        author={`${info.writer.name}`}
                        content={<p>{info.content}</p>}
                    />
                </div>
))}


        </div>
    )
}

export default CommentOne
