import React, { Component } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    const { query } = this.state;

    event.preventDefault();

    if (query.trim() === '') {
      // alert('Enter some text');
      this.notify();
      this.resetForm();
      return;
    }

    this.props.onSubmit(query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ query: '' });
  };

  notify = () => {
    toast.info('Please type at least one letter!', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  handleInputChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch />
          </Button>
          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </Form>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ top: 0 }}
        />
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
