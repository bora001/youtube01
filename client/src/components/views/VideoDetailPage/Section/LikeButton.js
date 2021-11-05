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
        console.log("get liked")
        const variable = {
            CommentId:props.info._id
        }

        axios.post('/api/liked/getliked', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("success to get liked comment")
                    setLikedComment(response.data.comments)

                    let test =response.data.comments.map(x => x.userId)
                    console.log(test == user.userData._id)
                    if (test == user.userData._id) {
                        setLiked(true)
                    }
                } else {
                    alert("failed to get comment you liked, try again")
                }
        })
    }

    function onLiked() {
        console.log("liked")
        setLiked(!Liked)

        const variable = {
            videoId:props.info.postId,
            userId:user.userData._id,
            CommentId:props.info._id
        }

        axios.post('/api/liked/saveliked', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("success liked comment")
    //                 // setuserComment(response.data.comments)
                } else {
                    alert("failed to like the comment, try again")
                }
        })
    }
    return (
        <div style={{ width: '25px', cursor: 'pointer' }} onClick={onLiked}>
            {Liked ? <LikeTwoTone /> : <LikeOutlined />}
        </div>
    )
}

export default LikeButton
