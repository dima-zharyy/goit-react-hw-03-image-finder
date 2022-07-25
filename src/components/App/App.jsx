import React, { Component } from 'react';
import { Searchbar, ImageGallery, LoadButton, Modal, Loader } from 'components';
import { fetchImages } from 'service';
import { getProperData } from 'helpers';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    imagesData: [],
    page: 1,
    totalHits: 0,
    showModal: false,
    largeImageData: {},
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query: nextQuery, page: nextPage } = this.state;

    if (prevPage !== nextPage) {
      fetchImages(nextQuery, nextPage).then(data =>
        this.setState(prevState => ({
          totalHits: data.totalHits,
          imagesData: [...prevState.imagesData, ...getProperData(data)],
        }))
      );
    }

    if (prevQuery !== nextQuery) {
      fetchImages(nextQuery, nextPage).then(data =>
        this.setState({
          imagesData: getProperData(data),
          totalHits: data.totalHits,
        })
      );
    }
  }

  handleOpenModal = event => {
    const { largeImageUrl } = event.target.dataset;
    const tags = event.target.alt;

    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageData: { largeImageUrl, tags },
    }));
  };

  handleCloseModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      largeImageData: {},
    }));
  };

  handleLoadClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSubmit = query => {
    this.setState({ query, page: 1, imagesData: [] });
  };

  render() {
    const {
      imagesData,
      totalHits,
      showModal,
      largeImageData: { largeImageUrl, tags },
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        <Loader />
        <ImageGallery onOpenModal={this.handleOpenModal} images={imagesData} />
        {imagesData.length === 0 || imagesData.length === totalHits ? null : (
          <LoadButton onClick={this.handleLoadClick} />
        )}
        {showModal ? (
          <Modal onClose={this.handleCloseModal}>
            <img src={largeImageUrl} alt={tags} />
          </Modal>
        ) : null}
      </AppContainer>
    );
  }
}
