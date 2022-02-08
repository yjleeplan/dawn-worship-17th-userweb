import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';


const Comments = () => {
    const [ commentData, setCommentData ] = useState({
        comments: [],
        submitting: false,
        value: '',
    });

    const handleSubmit = () => {
        if (!commentData.value) return;
    
        setCommentData({
            ...commentData,
            submitting: true,
        });

        setTimeout(() => {
            setCommentData({
                submitting: false,
                value: '',
                comments: [
                    ...commentData.comments,
                    {
                        author: '홍길동',
                        avatar: <Avatar icon={<UserOutlined />} alt='홍길동' />,
                        content: <p>{commentData.value}</p>,
                        datetime: moment().fromNow(),
                    },
                ],
            });
        }, 1000);
    };

    const handleChange = e => {
        setCommentData({
            ...commentData,
            value: e.target.value,
        });
    };

    return (
        <>
            {commentData.comments.length > 0 && <List
                dataSource={commentData.comments}
                header={`${commentData.comments.length} 댓글`}
                itemLayout='horizontal'
                renderItem={props => <Comment {...props} />}
            />}
            <Comment
                avatar={<Avatar icon={<UserOutlined />} alt='홍길동' />}
                content={
                    <>
                        <Form.Item>
                            <Input.TextArea rows={4} onChange={handleChange} value={commentData.value} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' loading={commentData.submitting} onClick={handleSubmit} type='primary'>
                            등록
                            </Button>
                        </Form.Item>
                    </>
                }
            />
      </>
    );
}

export default Comments;