import React, {useEffect, useState} from 'react'
import { LikeTwoTone,LikeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux'

function LikeButton(props) {

    const [Liked, setLiked] = useState(false)
    const [LikedComment, setLikedComment] = useState([])
    const user = useSelector(state => state.user);

    useEffect(() => {
        getLiked()
    }, [])

    function getLiked() {

        const variable = {
            userId:user.userData._id,
            CommentId:props.info._id
        }

        axios.post('/api/liked/getliked', variable)
            .then(response => {
                if (response.data.success) {
                    setLikedComment(response.data.comments)
                    let likes = response.data.comments.map(x => x.userId)
                    if (likes == user.userData._id) {
                        setLiked(true)
                    }
                } else {
                    alert("failed to get comment you liked, try again")
                }
        })
    }

    function onLiked() {

        setLiked(!Liked)

        const variable = {
            videoId:props.info.postId,
            userId:user.userData._id,
            CommentId:props.info._id
        }

        if (Liked) {
            //already liked

            axios.post('/api/liked/removeliked', variable)
                .then(response => {
                    if (response.data.success) {
                        console.log("success unliked comment", response.data.unliked)
                    } else {
                        alert("failed to unlike the comment, try again")
                    }
            })    

        } else {

            axios.post('/api/liked/saveliked', variable)
                .then(response => {
                    if (response.data.success) {
                        console.log("success liked comment")
                    } else {
                        alert("failed to like the comment, try again")
                    }
            })    
        }
    }
    return (
        <div style={{ width: '25px', cursor: 'pointer' }} onClick={onLiked}>
            {Liked ? <LikeTwoTone /> : <LikeOutlined />}
        </div>
    )
}

export default LikeButton
