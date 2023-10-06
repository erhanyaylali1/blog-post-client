import { Link } from "react-router-dom";
import React, { useState } from 'react';

const Avatar = ({ image, name, size, link }) => {
  const [is_image_broken, set_is_image_broken] = useState(false);

  const initials_style = {
    borderRadius: 50,
    margin: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#172B4D',
    fontFamily: 'Montserrat',
    fontSize: size / 2 + 'px',
    fontWeight: 500,
    color: '#EEE',
    height: size + 'px',
    width: size + 'px',
    cursor: 'pointer',
  };
  const image_style = {
    borderRadius: 50,
    background: 'radial-gradient(circle, #FFFFFF 0%, #F5F5F5 100%)',
    margin: 4,
    objectFit: 'cover',
    height: size + 'px',
    width: size + 'px',
    cursor: 'pointer',
  };

  return (
    <Link to={link}>
      {image && !is_image_broken ? (
        <img
          style={image_style}
          alt="logo"
          loading="lazy"
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            set_is_image_broken(true);
          }}
        />
      ) : (
        <div style={initials_style}>{name?.[0] || ''}</div>
      )}
    </Link>
  );
};

export default Avatar;
