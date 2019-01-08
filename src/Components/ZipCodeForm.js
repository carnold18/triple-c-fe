import React, { Component } from 'react';

class ZipCodeForm extends Component {

    render() {

        return (
        <div className="location">
          <form onSubmit={this.props.searchTerm}>
            <input
                type="text"
                onChange={this.props.handleChange}
                placeholder="Zip Code"
                name="Zip Code"
            />
            <input type="submit" className="button small special align-center"/>
          </form>
        </div>
        )
    }
}

export default ZipCodeForm;