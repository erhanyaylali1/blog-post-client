import React from 'react';
import styles from './style.module.css';
import { useNavigate } from "react-router-dom";

const CarouselItem = ({ post }) => {
  const navigate = useNavigate();
  const navigateToPost = () => navigate(`/post/${post._id}`);
  return (
    <div className={styles.carousel_item} onClick={navigateToPost}>
      <div className={styles.carousel_item_title}>{post.title}</div>
      <div className={styles.carousel_item_content}>
        {post.content}
      </div>
    </div>
  );
};

export default CarouselItem;
