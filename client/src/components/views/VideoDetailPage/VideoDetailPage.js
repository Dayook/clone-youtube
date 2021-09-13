import React, { useEffect, useState } from "react";
import { List, Typography, Row, Col, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Section/SideVideo";
import Subscribe from "./Section/Subscribe";
import Comment from "./Section/Comment";

const { Title } = Typography;

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [Video, setVideo] = useState([]);
  const [Comments, setComments] = useState([]);

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment))
  }
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

    Axios.post("/api/comments/getComments", variable).then((response) => {
      if (response.data.success) {
        setComments(response.data.comments);
      } else {
        alert("코멘트 정보를 가져오는 것을 실패하였습니다.");
      }
    });
  }, []);
  // .writer.image 정보를 가져오기 전에 화면이 렌더링되면
  // undefined 에러가 남. 따라서 return 이전에 조건설정을 해주면 ㅗㅎ음
  if (Video.writer) {
    const subscribeButton = Video.writer._id !==
      localStorage.getItem("userId") && <Subscribe userTo={Video.writer._id} />;

    return (
      <Row gutter={(16, 16)}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${Video.filePath}`}
              controls
            ></video>
            <List.Item actions={[subscribeButton]}>
              <List.Item.Meta
                avatar={<Avatar src={Video.writer.image} />}
                title={Video.writer.name}
                description={Video.description}
              ></List.Item.Meta>
            </List.Item>
            <Comment refreshFunction= {refreshFunction} commentLists={Comments} videoId={videoId} />
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
