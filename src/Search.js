import React from "react";
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.handleChange(event.target.value);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="search"
          placeholder="search"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
