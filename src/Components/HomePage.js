import React, { Component } from 'react';

class App extends Component {

  state = {
    zipCode: "",
    cityName: "",
    cityData: {},
  }

  searchTerm = (e) => {

    e.preventDefault();

    const API_KEY =`${process.env.REACT_APP_NREL_KEY}`
    const zip_code = this.state.zipCode
    // const USERS_URL = "https://sleepy-peak-12593.herokuapp.com/users"
    // const CITIES_URL = "https://sleepy-peak-12593.herokuapp.com/cities"
    const NREL_URL = "https://developer.nrel.gov/api/cleap/v1/energy_cohort_data?zip="+zip_code+"&api_key="+API_KEY

    fetch(NREL_URL)
    .then(response => response.json())
    .then(results => {
        // const result = results.result[0]
        const raw = results.result

        const currentCity = Object.keys(results.result)[0]

        const filtered = Object.keys(raw)
        .filter(key => currentCity.includes(key))
        .reduce((obj, key) => {
            obj[key] = raw[key]
            return obj;
        }, {})

        console.log(raw)
        console.log(currentCity)
        console.log("City Name:",Object.keys(filtered))
        console.log("City Object:",filtered)

        this.setState({
            cityName: Object.keys(filtered),
            cityData: filtered
        })
        debugger

    })
}

  handleChange = (e) => {
    this.setState({
      zipCode: e.target.value
    })
  }

  render() {


    return (
      <div className="homepage">
        <div className="location">
          <form onSubmit={this.searchTerm}>
            <input
                type="text"
                onChange={this.handleChange}
                placeholder="Zip Code"
                name="Zip Code"
            />
            <input type="submit" className="button small special align-center"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;