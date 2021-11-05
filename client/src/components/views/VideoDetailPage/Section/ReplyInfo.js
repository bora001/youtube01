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
                return <div key={index} style={{paddingLeft:'3%', marginLeft:'5%', borderLeft:'2px solid dodgerblue'}}>
                    <Comment
                        avatar={<Avatar size="small" icon={<UserOutlined />} />}
                        author={`${reply.writer.name}`}
                />
                    <p style={{paddingBottom:'2%'}}>{reply.content}</p>
                </div>
            })}

        </div>
    )
}

export default ReplyInfo
