import React, { Component } from 'react';
import { Searchbar, ImageGallery, LoadButton, Modal, Loader } from 'components';
import { fetchImages } from 'service';
import { getProperData } from 'helpers';
import { AppContainer, EmptyResultMessage } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    imagesData: [],
    page: 1,
    totalHits: 0,
    largeImageData: {},
    showModal: false,
    showSpinner: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery, page: prevPage } = prevState;
    const { query: nextQuery, page: nextPage } = this.state;

    if (prevPage !== nextPage) {
      this.setState({ showSpinner: true });
      fetchImages(nextQuery, nextPage)
        .then(data =>
          this.setState(prevState => ({
            totalHits: data.totalHits,
            imagesData: [...prevState.imagesData, ...getProperData(data)],
          }))
        )
        .finally(() => this.setState({ showSpinner: false }));
    }

    if (prevQuery !== nextQuery) {
      this.setState({ showSpinner: true, error: null });

      fetchImages(nextQuery, prevPage)
        .then(data => {
          if (data.totalHits === 0) {
            return Promise.reject(`There is no result on query: ${nextQuery}`);
          }

          this.setState({
            imagesData: getProperData(data),
            totalHits: data.totalHits,
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ showSpinner: false }));
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
      showSpinner,
      error,
      largeImageData: { largeImageUrl, tags },
    } = this.state;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <EmptyResultMessage>{error}</EmptyResultMessage>}
        <ImageGallery onOpenModal={this.handleOpenModal} images={imagesData} />
        {imagesData.length === 0 || imagesData.length === totalHits
          ? null
          : !showSpinner && <LoadButton onClick={this.handleLoadClick} />}
        {showSpinner && <Loader />}
        {showModal ? (
          <Modal onClose={this.handleCloseModal}>
            <img src={largeImageUrl} alt={tags} />
          </Modal>
        ) : null}
      </AppContainer>
    );
  }
}
