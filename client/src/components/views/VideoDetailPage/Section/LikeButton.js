import React, {useEffect, useState} from 'react'
import { LikeTwoTone,LikeOutlined } from '@ant-design/icons';

function LikeButton() {


    const [Liked, setLiked] = useState(false)
    useEffect(() => {
    }, [])

    function onLiked() {
        console.log("liked")
        setLiked(!Liked)
    }

    return (
        <div style={{ width:'25px', cursor: 'pointer' }} onClick={onLiked}>
            {Liked?<LikeTwoTone />:<LikeOutlined />}
            
            
        </div>
    )
}

export default LikeButton
