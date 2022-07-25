import React, { Component } from 'react';
import { Header, Form, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = event => {
    const { query } = this.state;

    event.preventDefault();

    if (query.trim() === '') {
      alert('Enter some text');
      this.resetForm();
      return;
    }

    this.props.onSubmit(query);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ query: '' });
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
      </Header>
    );
  }
}
