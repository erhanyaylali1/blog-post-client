import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { stripHtml } from 'string-strip-html';
import styles from './style.module.css';
import Avatar from '../shared/Avatar';
import getRelativeTime from '../../utils/getRelativeTime';
import { useRouter } from 'next/router';

const HomePagePostCard = ({ post }) => {
  const router = useRouter();

  const navigateToPost = () => router.push(`/post/${post._id}`);
  const navigateToAuthor = () => router.push(`/user/${post.user_id._id}`);

  return (
    <Card className="mb-5 w-100">
      <div className="row m-0 p-0">
        {post?.photo && (
          <div className={`col-md-4 p-0 col-xs-12 ${styles.home_card_image}`}>
            <CardMedia
              component="img"
              sx={{ height: '100%', width: '100%' }}
              alt={post?.title}
              style={{ cursor: 'pointer' }}
              onClick={navigateToPost}
              image={`data:Buffer;base64,${Buffer.from(
                post?.photo?.data
              ).toString('base64')}`}
            />
          </div>
        )}
        <div
          className={`${post?.photo ? 'col-md-8' : 'col-md-12'} col-xs-12 pl-3`}>
          <CardContent
            style={{ paddingBottom: '10px' }}
            className="h-100 d-flex flex-column">
            <p
              className={`display-4 ${styles.card_title} m-0 mb-3`}
              style={{ cursor: 'pointer' }}
              onClick={navigateToPost}>
              {post.title}
            </p>
            <p
              className={styles.card_content}
              style={{ cursor: 'pointer' }}
              onClick={navigateToPost}>
              {stripHtml(post.content).result}
            </p>
            <div className={styles.author_wrapper}>
              <div className="d-flex align-items-center w-100">
                <div style={{ cursor: 'pointer' }} onClick={navigateToAuthor}>
                  <Avatar
                    name={post.user_id.full_name}
                    image={
                      post?.user_id?.photo
                        ? `data:Buffer;base64,${Buffer.from(
                            post?.user_id?.photo?.data
                          ).toString('base64')}`
                        : ''
                    }
                    link={`/user/${post.user_id._id}`}
                    size="35"
                  />
                </div>
                <p
                  className={`m-0 ml-2 ${styles.created_by}`}
                  style={{ cursor: 'pointer' }}
                  onClick={navigateToAuthor}>
                  {post.user_id.full_name}
                </p>
                <p className={`text-muted ${styles.created_at}`}>
                  {getRelativeTime(post.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default HomePagePostCard;
