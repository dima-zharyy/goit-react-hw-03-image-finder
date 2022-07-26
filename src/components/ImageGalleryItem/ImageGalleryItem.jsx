import React from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  imageLarge,
  imageSrc,
  imageAlt,
  onClick,
}) => {
  return (
    <Item>
      <Image
        onClick={onClick}
        src={imageSrc}
        alt={imageAlt}
        data-large-image-url={imageLarge}
        loading="lazy"
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  imageLarge: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
