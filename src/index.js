import React from "react";
import ReactDOM from "react-dom";
import Data from "../data.js";
import Search from "./Search";
import Pagination from "./Pagination";
import CampaignList from "./CampaignList";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      currentPage: 1,
      listPerPage: 10,
      search: "",
      checkedItems: []
    };
    this.changePage = this.changePage.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.deleteBulk = this.deleteBulk.bind(this);
  }

  handleCheckboxChange(id) {
    let { checkedItems } = this.state;
    this.setState({ checkedItems: checkedItems.concat(id) });
  }

  deleteBulk() {
    let { data, checkedItems } = this.state;
    let d = data.filter(ele => !checkedItems.includes(ele._id));
    this.setState({ data: d });
  }

  handleEdit() {}

  handleDelete(id) {
    let { data } = this.state;
    let d = data.filter(ele => ele._id !== id);
    this.setState({ data: d });
  }

  getPaginatedData() {
    let { data, currentPage, listPerPage, search } = this.state;
    let start = (currentPage - 1) * 10;

    if (!search) {
      return data.slice(start, start + 10);
    }
    return data
      .slice(start, start + 10)
      .filter((ele, index) => ele.name.includes(search));
  }
  changePage(currentPage) {
    this.setState({ currentPage });
  }
  handleChange(search) {
    let self = this;
    setTimeout(() => self.setState({ search }), 0);
  }
  render() {
    let { data, currentPage, search } = this.state;
    return (
      <React.Fragment>
        <Search handleChange={this.handleChange} search={search} />
        <CampaignList
          data={this.getPaginatedData()}
          handleCheckboxChange={this.handleCheckboxChange}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          deleteBulk={this.deleteBulk}
        />
        <Pagination
          data={data}
          currentPage={currentPage}
          changePage={this.changePage}
        />
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
