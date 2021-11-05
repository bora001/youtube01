import React, { useState ,useEffect } from 'react'
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function ReplyInfo(props) {

    const [ReplyInfo, setReplyInfo] = useState([])

    useEffect(() => {
        setReplyInfo(props.replyinfo.reply)
    }, [props.replyinfo.reply])

    return (
        <div>
            {ReplyInfo && ReplyInfo.map((reply, index) => {
                return <div key={index} style={{marginLeft:'5%'}}>
                    <Comment
                        avatar={<Avatar size="small" icon={<UserOutlined />} />}
                        author={`${reply.writer.name}`}
                />
                    <p>{reply.content}</p>
                </div>
            })}

        </div>
    )
}

export default ReplyInfo
