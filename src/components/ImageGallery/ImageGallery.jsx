import React from 'react';
import { ImageGalleryItem } from 'components';
import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

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

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onOpenModal: PropTypes.func.isRequired,
};
