import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component { 

  state = {
    currentUser: {},
    token: "",
    isLoggedIn: false,
  }

  render() {

    const API_KEY =`${process.env.REACT_APP_NREL_KEY}`
    const zip_code = this.state.currentUser.zip_code
    const USERS_URL = "https://sleepy-peak-12593.herokuapp.com/users"
    const CITIES_URL = "https://sleepy-peak-12593.herokuapp.com/cities"
    const NREL_URL = "https://developer.nrel.gov/api/cleap/v1/energy_cohort_data?zip="+zip_code+"&api_key="+API_KEY

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <h1>TRIPLE C</h1>
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
