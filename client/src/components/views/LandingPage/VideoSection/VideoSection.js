import React, { useEffect, useState } from 'react'
import { Card ,Row, Col, Avatar, Typography} from 'antd'
import axios from 'axios'
import { UserOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Title } = Typography;

function VideoSection() {

    const [VideoInfo, setVideoInfo] = useState([])

    useEffect(() => {
        axios.get('/api/uploads/getvideos')
            .then(response => {
                if (response.data.success) {
                    setVideoInfo(response.data.videos)
                } else {
                    alert('failed to get videos')
            }
        })
    }, [])
    

    const VideoEachInfo = VideoInfo.map((video, index) => {

        const min = Math.floor(video.duration/60)
        const sec = Math.floor(video.duration - min*60);
                
        console.log(video,"vid")
        return <Col lg={6} md={8} xs={24} key={index} >
                <a href={`/video/${video._id}`} style={{textDecoration:'none'}}>
                <img src={`http://localhost:5000/${video.thumbnail}`}></img>
                <div style={{display:'flex', width:'100%'}}>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <p>{video.writer.name}</p>
                </div>
                            <p>Title : {video.title}</p>
                            <p>Description : {video.description}</p>
                    <p>Duration {min < 10 ? `0` + min : min} : {sec < 10 ? `0` + sec : sec}</p>
                </a>
                </Col>

    })


    return (
        <div style={{width:'85%', margin:'0 auto'}}>
            <h3>Current Videos</h3>
   
            <Row gutter={[32, 16]}>
                {VideoEachInfo}
            </Row>
        </div>
    )
}

export default VideoSection
