import React, { useEffect, useState } from 'react';
import { Carousel, message } from 'antd';
import { getUserTrends } from '../../utils/apiCall';
import CarouselItem from './CarouselItem';

const UserTrends = ({ trends }) => {

  const carouselPost = () => {
    if (trends?.length > 0) {
      return (
        <Carousel autoplay autoplaySpeed={2000} dots dotPosition="bottom">
          {trends.map((trend) => (
            <CarouselItem post={trend} key={trend._id} />
          ))}
        </Carousel>
      );
    } else return null;
  };

  return (
    <div className="p-0 px-md-5 my-5 text-align">
      <div
        style={{
          textAlign: 'left',
          marginLeft: '10px',
          marginBottom: '10px',
          fontSize: '20px',
        }}>
        Trends Posts
      </div>
      <div>{carouselPost()}</div>
    </div>
  );
};

export default UserTrends;
