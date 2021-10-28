import React, {useState} from 'react'
import { Comment, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
function CommentOne(props) {

    const [Reply, setReply] = useState(false)
    
    const onReply = () => {
        setReply(!Reply)
    }

    return (
        <div style={{}}>

                <div>
                    <Comment
                        actions={[<span key="comment-nested-reply-to" onClick={onReply}>Reply to</span>]}
                        avatar={<Avatar size="small" icon={<UserOutlined />} />}
                        author={`${props.info.writer.name}`}
                        content={<p>{props.info.content}</p>}
                    />
                </div>

            {Reply && 

                <form style={{ marginLeft: '10%', height: 'inherit', flexDirection: 'row', justifyContent: 'initial', alignItems: 'initial' }}>
                <textarea style={{width:'30%', height:'50px'}}/>
                <button style={{backgroundColor:'dodgerblue'}}>Comment</button>
                </form>
            }



            
        </div>
    )
}

export default CommentOne
