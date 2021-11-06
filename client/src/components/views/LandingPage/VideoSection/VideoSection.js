import React, { useEffect, useState } from 'react'
import { Row, Col, Avatar } from 'antd'
import axios from 'axios'
import { UserOutlined } from '@ant-design/icons';

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
            <a href={`/video/${video._id}`} style={{ textDecoration: 'none', color: '#000' }}>
                    <p style={{position:'absolute', color:'#fff',backgroundColor:'#000',padding:'5px', letterSpacing:'1px'}}>{min < 10 ? `0` + min : min} : {sec < 10 ? `0` + sec : sec}</p>
                
                <img src={`http://localhost:5000/${video.thumbnail}`}></img>
                <div style={{marginTop:'10px', fontSize:'16px', lineHeight:'22px',fontWeight:'500'}}>
                    <div style={{display:'flex', width:'100%'}}>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <p style={{ marginLeft: '10px' }}>{`${video.writer.name} - ${video.title}`}</p>
                    </div>
                </div>

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
