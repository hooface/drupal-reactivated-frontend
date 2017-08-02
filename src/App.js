import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';

superagentJsonapify(superagent);

const BASE_URL = 'http://localhost:8000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: null
    }
  }

  render() {
    const { error, errorMessage, articles, more } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Drupal REACTivated</h2>
        </div>
        <p className="App-intro">
          <button onClick={this.handleCountClick}>Count Articles</button>
        </p>
        {
          error &&
          <h2>{errorMessage}</h2>
        }
        {
          articles &&
          <h2>You have {more ? `more than ${articles.length}` : articles.length} articles on your Drupal backend.</h2>
        }
      </div>
    );
  }

  handleCountClick = () => {
    superagent.get(`${BASE_URL}/jsonapi/node/article`)
      .then(response => {
        const body = response.body
        const articles = body.data
        const more = body.links.hasOwnProperty('next')
        this.setState({
          error: false,
          articles: articles,
          more: more
        })
      })
      .catch((error) => {
        this.setState({
          error: true,
          errorMessage: `Error fetching articles: '${error.message}'`
        })
      })
  }
}

export default App;
