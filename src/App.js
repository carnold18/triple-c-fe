import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './Components/HomePage.js'

class App extends Component { 

  state = {
    currentUser: {},
    token: "",
    isLoggedIn: false,
    city: {},
    cities: [],
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>TRIPLE C</h1>
          <a
            className="App-link"
            href="https://developer.nrel.gov/docs/cleap/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data from NREL
          </a>
        </header>
        <HomePage />
      </div>
    );
  }
}

export default App;
