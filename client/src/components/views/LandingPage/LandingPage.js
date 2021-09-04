import React, { useEffect } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import Axios from "axios";
const { Title } = Typography;

function LandingPage() {
  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
      } else {
        alert("비디오 가져오기 실패");
      }
    });
  }, []);

  // const renderCards

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title levle={2}> Recommended </Title>
      <hr />
      <Row gutter={(32, 16)}>
        {/* {renderCards} */}
        <Col lg={6} md={8} xs={24}></Col>
      </Row>
    </div>
  );
}

export default LandingPage;
