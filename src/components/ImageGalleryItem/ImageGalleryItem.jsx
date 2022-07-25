import React from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

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
