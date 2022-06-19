import React, { useEffect, useState } from 'react';
import { Carousel, message } from 'antd';
import { getUserTrends } from '../../utils/apiCall';
import CarouselItem from './CarouselItem';

const UserTrends = ({ id }) => {
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    if (id) {
      getUserTrends(id).then((response) => {
        if (response.error) {
          message.error(response.error);
        } else {
          setTrends(response.posts);
        }
      });
    }
  }, [id]);

  const carouselPost = () => {
    if (trends?.length > 0) {
      return (
        <Carousel autoplay autoplaySpeed={2000}>
          {trends.map((trend) => (
            <CarouselItem post={trend} key={trend._id} />
          ))}
        </Carousel>
      );
    } else return null;
  };

  return (
    <div className="p-5 text-align">
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
