import React, { useEffect, useState } from "react";
import { List, Typography, Row, Col, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Section/SideVideo";
import Subscribe from "./Section/Subscribe";

const { Title } = Typography;

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        console.log("video data:", response.data.video);
        // console.log("video data:", response.data.video.writer.name);
        setVideo(response.data.video);
        console.log("Videod:", Video);
      } else {
        alert("Failed to get video Info");
      }
    });
  }, []);
  // .writer.image 정보를 가져오기 전에 화면이 렌더링되면
  // undefined 에러가 남. 따라서 return 이전에 조건설정을 해주면 ㅗㅎ음
  if (Video.writer) {
    return (
      <Row gutter={(16, 16)}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>
            {Video.title} {Video.description} {Video.duration}
            <List.Item actions={[<Subscribe userTo={Video.writer._id}/>]}>
              <List.Item.Meta
                avatar={<Avatar src={Video.writer.image} />}
                title={Video.writer.name}
                description={Video.description}
              ></List.Item.Meta>
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading..</div>;
  }
}

export default VideoDetailPage;
