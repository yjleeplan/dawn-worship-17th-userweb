import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Comment, Input, List, message } from "antd";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
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
    comments: [],
    value: "",
  });

  /** Effect */
  useEffect(() => {
    handleListComment();
    // eslint-disable-next-line
  }, []);

  // 댓글 목록 조회
  const handleListComment = async () => {
    try {
      setIsLoading(true);
      const { data: comments } = await api.listComment({});
      const newData = _.map(comments, (item) => {
        return {
          author: item.user_name,
          avatar: (
            <Avatar
              icon={<UserOutlined />}
              style={{
                backgroundColor:
                  colorCodeList[_.random(0, colorCodeList.length)],
              }}
            />
          ),
          content: <p>{item.content}</p>,
          datetime: moment(item.created_at).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      setCommentData({
        value: "",
        comments: newData,
      });
    } catch (error) {
      message.error(
        error.response
          ? `${error.response.data.code}, ${error.response.data.message}`
          : "댓글 목록 조회 실패"
      );
    } finally {
      setIsLoading(false);
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
      <List
        dataSource={commentData.comments}
        header={`${commentData.comments.length} 댓글`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
      />
      <Comment
        // avatar={<Avatar icon={<UserOutlined />} alt="홍길동" />}
        content={
          <>
            <Input
              className="comment-user-name"
              onChange={handleUserNameChange}
              value={commentUserName}
              placeholder="이름을 입력해주세요"
            />
            <Input.TextArea
              rows={4}
              onChange={handleCommentChange}
              value={commentData.value}
              placeholder="댓글을 입력해주세요"
            />
            <Button
              className="commentBtn"
              loading={false}
              onClick={handleSubmit}
              type="primary"
            >
              댓글 등록
            </Button>
          </>
        }
      />
    </div>
  );
};

export default Comments;
