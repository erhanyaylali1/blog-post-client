import React from 'react';
import styles from './style.module.css';
import { stripHtml } from 'string-strip-html';
import { useRouter } from 'next/router';

const CarouselItem = ({ post }) => {
  const router = useRouter();
  const navigateToPost = () => router.push(`/post/${post._id}`);
  return (
    <div className={styles.carousel_item} onClick={navigateToPost}>
      <div className={styles.carousel_item_title}>{post.title}</div>
      <div className={styles.carousel_item_content}>
        {stripHtml(post.content).result}
      </div>
    </div>
  );
};

export default CarouselItem;
