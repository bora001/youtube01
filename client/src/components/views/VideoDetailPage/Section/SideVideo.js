import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, List, Avatar } from "antd";
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
      <div key={index}>
        <img src={`http://localhost:5000/${video.thumbnail}`} />
        <div>
          <List.Item.Meta
            avatar={<Avatar size="small" icon={<UserOutlined />} />}
            title={video.writer.name}
        />
          <p>Title : {video.title}</p>
          <p>Description : {video.description}</p>
          <p>
            Duration {min < 10 ? `0` + min : min} : {sec < 10 ? `0` + sec : sec}
          </p>
          <p>view: {video.views}</p>
        </div>
      </div>
    );
  });

  return <>{renderVideos}</>;
}

export default SideVideo;
