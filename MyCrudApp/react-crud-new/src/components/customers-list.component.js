import React, { Component } from "react";
import customerDataService from "../services/customer.service";
import { Link } from "react-router-dom";

export default class customersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchcustomername = this.onChangeSearchcustomername.bind(this);    
    this.retrievecustomers = this.retrievecustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivecustomer = this.setActivecustomer.bind(this);
    this.searchcustomerName = this.searchcustomerName.bind(this);

    this.state = {
      customers: [],
      currentcustomer: null,
      currentIndex: -1,
      searchcustomerName: ""
    };
  }

  componentDidMount() {
    this.retrievecustomers();
  }

  onChangeSearchcustomername(e) {
    const searchcustomerName = e.target.value;

    this.setState({
      searchcustomerName: searchcustomerName
    });
  }

  retrievecustomers() {
    customerDataService.getAll()
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievecustomers();
    this.setState({
      currentcustomer: null,
      currentIndex: -1
    });
  }

  setActivecustomer(customer, index) {
    this.setState({
      currentcustomer: customer,
      currentIndex: index
    });
  }

  searchcustomerName() {
    this.setState({
      currentcustomer: null,
      currentIndex: -1
    });

    customerDataService.findBycustomername(this.state.searchcustomerName)
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchcustomerName, customers, currentcustomer, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by customername"
              value={searchcustomerName}
              onChange={this.onChangeSearchcustomername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchcustomerName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>customers List</h4>

          <ul className="list-group">
            {customers &&
              customers.map((customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivecustomer(customer, index)}
                  key={index}
                >
                  {customer.customerName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentcustomer ? (
            <div>
              <h4>customer</h4>
              <div>
                <label>
                  <strong>customername:</strong>
                </label>{" "}
                {currentcustomer.customerName}
              </div>
              <div>
                <label>
                  <strong>postalcode:</strong>
                </label>{" "}
                {currentcustomer.postalCode}
              </div>
              <div>
                <label>
                  <strong>income:</strong>
                </label>{" "}
                {currentcustomer.income}
              </div>
              <div>
                <label>
                  <strong>expense:</strong>
                </label>{" "}
                {currentcustomer.expense}
              </div>

              <div>
                <label>
                  <strong>propertyvalue:</strong>
                </label>{" "}
                {currentcustomer.propertyValue}
              </div>


              <Link
                to={"/customers/" + currentcustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
