import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Section/SideVideo";
import Subscribe from "./Section/Subscribe";


function VideoDetailPage(props) {
  // props.match.params = http://address
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [DetailOfVideo, setDetailOfVideo] = useState("");

  useEffect(() => {
    axios.post("/api/uploads/videodetails", variable).then((response) => {
      if (response.data.success) {
        console.log("deteail", response.data.videodetails)
        setDetailOfVideo(response.data.videodetails);
      } else {
        alert("failed to get videos from the server");
      }
    });
  }, []);

  return (
    <div>
      <Row guttuer={[16, 16]}>
        <Col lg={18} xs={24}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${DetailOfVideo.filePath}`}
            controls
          ></video>
          <List.Item actions={[<Subscribe/>]}>
          {/* <List.Item actions={[<Subscribe userTo={DetailOfVideo.writer._id}/>]}> */}
            {/* array form for actions in antd*/}
            <List.Item.Meta
              avatar
              title={DetailOfVideo.title}
              description={DetailOfVideo.description}
            />
          </List.Item>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(VideoDetailPage);
