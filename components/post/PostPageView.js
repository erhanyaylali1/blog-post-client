import React, { useState } from 'react';
import styles from './style.module.css';
import Avatar from '../shared/Avatar';
import getRelativeTime from '../../utils/getRelativeTime';
import Link from 'next/link';
import { message, Button, Tooltip, Comment, List, Input, Form } from 'antd';
import {
  EyeOutlined,
  HeartOutlined,
  HeartFilled,
  MessageFilled,
} from '@ant-design/icons';
import { getCookie, isAuth } from '../../utils/browserOperations';
import {
  deleteComment,
  likePost,
  shareComment,
  unlikePost,
} from '../../utils/apiCall';
const { TextArea } = Input;

const PostPageView = ({ post, refreshPage }) => {
  const user = isAuth();
  const token = getCookie('token');
  const [newComment, setNewComment] = useState('');
  const [newCommentLoading, setNewCommentLoading] = useState(false);

  const renderCategories = () => {
    return post?.categories?.map((category) => {
      return (
        <Link href={`/categories/${category._id}`} key={category._id}>
          <div className="mr-2 mb-2" style={{ cursor: 'pointer' }}>
            <div
              className={`badge badge-secondary d-flex flex-row align-items-center`}
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                padding: '7px 10px',
              }}>
              <p className="p-0 m-0">{category.name}</p>
            </div>
          </div>
        </Link>
      );
    });
  };

  const renderTags = () => {
    return post?.tags?.map((tag) => {
      return (
        <Link href={`/tags/${tag._id}`} key={tag._id}>
          <div className="mr-2 mb-2" style={{ cursor: 'pointer' }}>
            <div
              className={`badge badge-secondary d-flex flex-row align-items-center`}
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                padding: '7px 10px',
              }}>
              <p className="p-0 m-0">#{tag.name}</p>
            </div>
          </div>
        </Link>
      );
    });
  };

  const isUserLikedThisPost = () => {
    if (!user) return false;
    return post?.likes?.filter((like) => like.user_id === user._id)?.length > 0;
  };

  const toggleLike = () => {
    if (user && token) {
      if (isUserLikedThisPost()) {
        unlikePost(post._id, token).then((res) => {
          if (res.error) message.error(res.error, 0.5);
          else message.success(res.message, 0.5);
        });
      } else {
        likePost(post._id, token).then((res) => {
          if (res.error) message.error(res.error, 0.5);
          else message.success(res.message, 0.5);
        });
      }
      refreshPage();
    }
  };

  const postNewComment = () => {
    setNewCommentLoading(true);
    shareComment(post._id, token, { content: newComment }).then((res) => {
      if (res.error) message.error(res.error, 0.5);
      else {
        message.success(res.message, 0.5);
        setNewComment('');
        refreshPage();
      }
      setNewCommentLoading(false);
    });
  };

  const deleteCommentFromPost = (comment_id) => {
    deleteComment(post._id, comment_id, token).then((res) => {
      if (res.error) message.error(res.error, 0.5);
      else {
        message.success(res.message, 0.5);
        refreshPage();
      }
    });
  };

  const renderComments = () => {
    if (post?.comments) {
      return (
        <>
          <List
            className="comment-list"
            header={`${post.comments.length} comments`}
            itemLayout="horizontal"
            dataSource={post.comments}
            renderItem={(item) => {
              const actionButtons =
                user._id === item.user_id._id
                  ? [
                      <Button
                        danger
                        type="text"
                        style={{ marginTop: '-10px' }}
                        onClick={() => deleteCommentFromPost(item._id)}>
                        Delete
                      </Button>,
                    ]
                  : [];
              return (
                <li>
                  <Comment
                    actions={actionButtons}
                    author={
                      <Link href={`/users/${item.user_id._id}`}>
                        {item.user_id.full_name}
                      </Link>
                    }
                    avatar={
                      <Avatar
                        name={item.user_id.full_name}
                        image={item.user_id?.photo}
                        size="40"
                        link={`/users/${item.user_id._id}`}
                      />
                    }
                    content={item.content}
                    datetime={getRelativeTime(item.createdAt)}
                  />
                </li>
              );
            }}
          />
          {user && (
            <Comment
              avatar={
                <Avatar
                  name={user.full_name}
                  image={user?.photo}
                  size="40"
                  link={`/users/${user._id}`}
                />
              }
              content={renderNewCommentTextArea()}
            />
          )}
        </>
      );
    }
  };

  const renderNewCommentTextArea = () => (
    <>
      <Form.Item>
        <TextArea
          rows={4}
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={newCommentLoading}
          onClick={postNewComment}
          disabled={newComment.length === 0}
          type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

  return (
    <div className="col card p-3">
      {post?.photo && (
        <div className="row mx-1 my-1">
          <img
            className={styles.card_image}
            src={`data:Buffer;base64,${Buffer.from(post?.photo?.data).toString(
              'base64'
            )}`}
          />
        </div>
      )}
      <div className="row d-flex align-items-center justify-align-content-sm-around mt-4 mb-3 px-5 w-100">
        <div className="col d-flex align-items-center">
          <div>
            <Avatar
              name={post?.user_id?.full_name}
              image={post?.user_id?.photo}
              link={`/users/${post?.user_id?._id}`}
              size="40"
            />
          </div>
          <div className={styles.author}>{post?.user_id?.full_name}</div>
          <div className="row ml-4 text-muted mt-1">
            {post?.createdAt ? getRelativeTime(post.createdAt) : null}
          </div>
        </div>
        <div className="col">
          <div className="row d-flex align-items-center">
            <div className="d-flex flex-row justify-content-end w-100 align-items-center">
              <Tooltip title="Like" className="d-flex align-items-center mr-3">
                <Button
                  icon={
                    isUserLikedThisPost() ? (
                      <HeartFilled className="text-primary" />
                    ) : (
                      <HeartOutlined className="text-primary" />
                    )
                  }
                  onClick={toggleLike}
                  shape="circle"
                  type="text"
                  size="large"
                />
                <div>{post?.likes?.length}</div>
              </Tooltip>
              <Tooltip
                title="Comment"
                className="d-flex align-items-center mr-3">
                <Button
                  icon={<MessageFilled className="text-primary" />}
                  shape="circle"
                  type="text"
                  size="large"
                  style={{ cursor: 'text' }}
                />
                <div>{post?.comments?.length}</div>
              </Tooltip>
              <Tooltip title="View" className="d-flex align-items-center">
                <Button
                  icon={<EyeOutlined className="text-primary" />}
                  shape="circle"
                  type="text"
                  size="large"
                  style={{ cursor: 'text' }}
                />
                <div>{post?.view}</div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="col mt-1 w-100">
        <div className="w-100 mb-4">
          <p className={styles.post_title}>{post?.title}</p>
        </div>
        <div
          className="mb-5 col"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
        <div className="d-flex flex-column w-100 mb-3">
          <div className="d-flex flex-column">
            <div className={styles.post_categories_header}>Categories</div>
            <div className="d-flex flex-row">{renderCategories()}</div>
          </div>
          <div className="mt-4 d-flex flex-column">
            <div className={styles.post_categories_header}>Tags</div>
            <div className="d-flex flex-row">{renderTags()}</div>
          </div>
        </div>
        <div className="d-flex flex-column w-100 mb-3">{renderComments()}</div>
      </div>
    </div>
  );
};

export default PostPageView;
