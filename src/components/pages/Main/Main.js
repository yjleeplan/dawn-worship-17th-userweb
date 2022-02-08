import { Col, Image, Row } from "antd";
import React from "react";
import title from "../../../assets/images/title.png";
import Comments from "../../common/Comments";
import VideoPlayer from "../../common/VideoPlayer";

const Main = ({ history, setIsLoading }) => {
  return (
    <>
      <Row className="user-attendance-modal-title">
        <Col span={24}>
          <Image width={192} height={160} src={title} preview={false} />
        </Col>
      </Row>
      <VideoPlayer />
      <Comments setIsLoading={setIsLoading} />
    </>
  );
};

export default Main;
