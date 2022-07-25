import React from 'react';
import { Button } from './Button.styled';

export const LoadButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} type="button">
      Load more
    </Button>
  );
};
