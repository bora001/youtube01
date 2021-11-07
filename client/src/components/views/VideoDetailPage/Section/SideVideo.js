import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, List, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

function SideVideo() {
  const [AllVideo, setAllVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/uploads/getvideos").then((response) => {
      if (response.data.success) {
        setAllVideo(response.data.videos);
      } else {
        alert("failed to get videos");
      }
    });
  }, []);

  const renderVideos = AllVideo.map((video, index) => {
    const min = Math.floor(video.duration / 60);
    const sec = Math.floor(video.duration - min * 60);

    return (
      <Col lg={22} md={8} xs={22} key={index}>
      {/* <div key={index} style={{width:'320px',margin:'0 auto'}}> */}
        <img src={`http://localhost:5000/${video.thumbnail}`} style={{width:'100%'}}/>
          <p style={{position:'absolute', top:'0', color:'#fff',backgroundColor:'#000',padding:'5px', letterSpacing:'1px'}}>{min < 10 ? `0` + min : min} : {sec < 10 ? `0` + sec : sec}</p>

        <div style={{padding:'10px'}}>
          <List.Item.Meta
            avatar={<Avatar size="small" icon={<UserOutlined />} />}
            title={`${video.writer.name} - ${video.title}`} />
          <p style={{fontSize:'18px'}}></p>
          <p style={{fontSize:'14px'}}>{video.views} views</p>
        </div>
        {/* </div> */}
        </Col>
    );
  });

  return <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>{renderVideos}</div>;
}

export default SideVideo;
