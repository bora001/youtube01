import React, { useEffect, useState } from 'react'
import {Col, Row}from 'antd'
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
    
    console.log(VideoInfo)


    return (
        <div>
            <h3>Current Videos</h3>
   
            <Row gutter={[32,16]}>
                <Col lg={6} md={8} xs={24}>
                    {VideoInfo.map((video, index) => (
                    <div key={index}>
                        <p >Title : {video.title}</p>
                        <p>Description : {video.description}</p>
                        <img src={`http://localhost:5000/${video.thumbnail}`}></img>
                    </div>
                    ))}
                </Col>
            </Row>

        </div>
    )
}

export default VideoSection
