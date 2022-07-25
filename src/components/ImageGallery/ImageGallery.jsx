import React from 'react';
import { ImageGalleryItem } from 'components';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <List>
      {images.map(image => {
        return (
          <ImageGalleryItem
            onClick={event => onOpenModal(event)}
            imageSrc={image.webformatURL}
            imageAlt={image.tags}
            imageLarge={image.largeImageURL}
            key={image.id}
          />
        );
      })}
    </List>
  );
};
