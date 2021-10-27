import React from 'react'
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function CommentOne(props) {

    return (
        <div style={{border:'3px solid blue'}}>

            {props.userComment && props.userComment.map((info, index) => (
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
