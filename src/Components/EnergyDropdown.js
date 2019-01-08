import React, { Component } from 'react';

class EnergyDropdown extends Component {

    render() {

        const options = this.props.options
        const value = this.props.value

        // console.log("options", this.props.options)
        // console.log("value", this.props.value)

        return (
            <div>
                <select onChange={this.props.handleSelect} value={value}>
                    {options.map(item => (
                        <option key={item.value} value={item.value}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

}

export default EnergyDropdown;