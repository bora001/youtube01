import axios from "axios";
import React, { useEffect, useState } from "react";

function SideVideo() {
  const [AllVideo, setAllVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/uploads/getvideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos, "yoooo");
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
