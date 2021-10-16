import React, { useEffect, useState } from 'react'
import { Row, Col} from 'antd'
import axios from 'axios'

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
                
        return <Col lg={6} md={8} xs={24} key={index} >
                    <a href={`/video/${video._id}`} style={{textDecoration:'none'}}>
                        <img src={`http://localhost:5000/${video.thumbnail}`}></img>
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
