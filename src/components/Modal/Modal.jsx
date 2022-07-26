import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContent } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    setTimeout(() => {
      window.addEventListener('click', this.handleBackdropClick);
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('click', this.handleBackdropClick);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target.nodeName !== 'IMG') {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop>
        <ModalContent>{this.props.children}</ModalContent>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
