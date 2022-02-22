import { EditOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Comment,
  Input,
  List,
  message,
  Skeleton,
} from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import * as api from "../../api";

const Comments = ({ setIsLoading }) => {
  const colorCodeList = [
    "#08080",
    "#ADD8E6",
    "#90EE90",
    "#87d068",
    "f56a00",
    "#2db7f5",
    "#108ee9",
    "#FFD700",
    "#cd201f",
    "#FA8072",
    "#EE82EE",
    "#8A2BE2",
  ];

  /** State */
  const [commentUserName, setCommentUserName] = useState("");
  const [commentData, setCommentData] = useState({
    totalCount: 0,
    comments: [],
    value: "",
  });
  const [commentOptions, setCommentOptions] = useState({
    offset: 0,
    limit: 10,
  });

  /** Effect */
  useEffect(() => {
    setIsLoading(true);
    handleListComment();
    setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  // 댓글 목록 조회
  const handleListComment = async () => {
    try {
      const { data: comments } = await api.listComment({
        query: commentOptions,
      });
      setCommentData({
        value: "",
        comments: [...commentData.comments, ...comments.items],
        totalCount: comments.total,
      });
      setCommentOptions({
        ...commentOptions,
        offset: commentOptions.offset + commentOptions.limit,
      });
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "댓글 목록 조회 실패"
      );
    }
  };

  // 댓글 등록
  const handleSubmit = async () => {
    if (!commentUserName) {
      message.warning("이름을 입력해주세요.");
      return;
    }
    if (!commentData.value) {
      message.warning("댓글을 입력해주세요.");
      return;
    }

    try {
      await api.createComment({
        data: { user_name: commentUserName, content: commentData.value },
      });
      await handleListComment();
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "댓글 등록 실패"
      );
    }
  };

  // 댓글 사용자 이름 Change
  const handleUserNameChange = (e) => {
    setCommentUserName(e.target.value);
  };

  // 댓글 내용 Change
  const handleCommentChange = (e) => {
    setCommentData({
      ...commentData,
      value: e.target.value,
    });
  };

  return (
    <div className="comment-wrap">
      <Card
        className="comment-add-wrap"
        bordered={false}
        title={`"특별새벽부흥회를 통해 받은 은혜를 나눠주세요!"`}
      >
        <Comment
          content={
            <>
              <Input
                className="comment-user-name"
                onChange={handleUserNameChange}
                value={commentUserName}
                placeholder="이름을 입력해주세요"
                size="large"
              />
              <Input.TextArea
                className="comment-content"
                rows={4}
                onChange={handleCommentChange}
                value={commentData.value}
                placeholder="댓글을 입력해주세요"
              />
              <Button
                className="comment-btn"
                loading={false}
                onClick={handleSubmit}
                type="primary"
              >
                <EditOutlined />
                댓글 등록
              </Button>
            </>
          }
        />
      </Card>
      <Card
        className="comment-list-wrap"
        bordered={false}
        title={`${commentData.totalCount} 댓글`}
      >
        <div id="infinite-scroll-comment">
          <InfiniteScroll
            dataLength={commentData.comments.length}
            next={handleListComment}
            hasMore={commentData.comments.length < commentData.totalCount}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="infinite-scroll-comment"
          >
            <List
              dataSource={commentData.comments}
              itemLayout="horizontal"
              renderItem={(item) => (
                <Comment
                  author={item.user_name}
                  avatar={
                    <Avatar
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor:
                          colorCodeList[_.random(0, colorCodeList.length)],
                      }}
                    />
                  }
                  content={<p>{item.content}</p>}
                  datetime={moment(item.created_at).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                />
              )}
            />
          </InfiniteScroll>
        </div>
      </Card>
    </div>
  );
};

export default Comments;
