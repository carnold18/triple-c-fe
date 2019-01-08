import React, { Component } from 'react';
import ZipCodeForm from './ZipCodeForm.js';
import EnergyDropdown from './EnergyDropdown';
import EnergyChart from './EnergyChart.js';

class HomePage extends Component {

  state = {
    zipCode: "",
    cityName: "",
    cityData: {},
    energyData: {},
    residential: {},
    industrial: {},
    commercial: {},
    cityFuel: {},
    options: [
      {
          name: "Select Option",
          value: null
      },
      {
          name: "Residential",
          value: 'residential'
      },
      {
          name: "Commercial",
          value: 'commercial'
      },
      {
          name: "Industrial",
          value: 'industrial'
      },
    ],
    value: '?',
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
        const raw = results.result
        const currentCity = Object.keys(results.result)[0]
        const filtered = Object.keys(raw)
        .filter(key => currentCity.includes(key))
        .reduce((obj, key) => {
            obj[key] = raw[key]
            return obj;
        }, {})

        // console.log(raw)
        // console.log(currentCity)
        // console.log("City Name:",Object.keys(filtered)[0])
        // console.log("City Object:",filtered)
        // console.log("Energy Data Object:",filtered[Object.keys(filtered)[0]].similar_places.table)

        this.setState({
            cityName: Object.keys(filtered)[0],
            cityData: filtered,
            energyData: filtered[Object.keys(filtered)[0]].similar_places.table,
            residential: {electric_expenditure: filtered[Object.keys(filtered)[0]].similar_places.table.residential_electric_expenditure, electric_use: filtered[Object.keys(filtered)[0]].similar_places.table.residential_electric_use, gas_expenditure: filtered[Object.keys(filtered)[0]].similar_places.table.residential_gas_expenditure, gas_use: filtered[Object.keys(filtered)[0]].similar_places.table.residential_gas_use},
            industrial: {electric_expenditure: filtered[Object.keys(filtered)[0]].similar_places.table.industrial_electric_expenditure, electric_use: filtered[Object.keys(filtered)[0]].similar_places.table.industrial_electric_use, gas_expenditure: filtered[Object.keys(filtered)[0]].similar_places.table.industrial_gas_expenditure, gas_use: filtered[Object.keys(filtered)[0]].similar_places.table.industrial_gas_use},
            commercial: {electric_expenditure: filtered[Object.keys(filtered)[0]].similar_places.table.commercial_electric_expenditure, electric_use: filtered[Object.keys(filtered)[0]].similar_places.table.commercial_electric_use, gas_expenditure: filtered[Object.keys(filtered)[0]].similar_places.table.commercial_gas_expenditure, gas_use: filtered[Object.keys(filtered)[0]].similar_places.table.commercial_gas_use},
            cityFuel: {diesel: filtered[Object.keys(filtered)[0]].similar_places.table.city_fuel_use_diesel, gas: filtered[Object.keys(filtered)[0]].similar_places.table.city_fuel_use_gas}
        })

        // debugger

    })
}

  handleChange = (e) => {
    this.setState({
      zipCode: e.target.value
    })
  }

  handleSelect = (event) => {
    this.setState({
        value: event.target.value
    })
  }

  render() {

    return (
      <div className="homepage">
        <ZipCodeForm handleChange={this.handleChange} searchTerm={this.searchTerm} />
        <EnergyDropdown handleSelect={this.handleSelect} options={this.state.options} value={this.state.value} />
        <EnergyChart />
      </div>
    );
  }
}

export default HomePage;