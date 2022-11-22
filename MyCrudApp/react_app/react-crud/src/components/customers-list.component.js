import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchCustomerName = this.onChangeSearchCustomerName.bind(this);
      this.retrieveCustomers = this.retrieveCustomers.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.state = {
        customers: [],
        currentCustomer: null,
        currentIndex: -1,
        searchCustomerName: ""
      };
}

componentDidMount() {
    this.retrieveCustomers();
  }
  onChangeSearchCustomerName(e) {
    const onChangeSearchCustomerName = e.target.value;

    this.setState({
      searchCustomerName: searchCustomerName
    });
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
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
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });
  }

  searchCustomerName() {
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });

    CustomerDataService.findByCustomerName(this.state.searchCustomerName)
      .then(response => {
        this.setState({
          customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }render() {
        const { searchCustomerName, customers, currentCustomer, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by customer name"
                  value={searchCustomerName}
                  onChange={this.onChangeSearchCustomerName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchCustomerName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Customer List</h4>
    
              <ul className="list-group">
                {customers &&
                  customers.map((customer, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveCustomer(customer, index)}
                      key={index}
                    >
                      {customer.customername}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentCustomer ? (
                <div>
                  <h4>Customer</h4>
                  <div>
                    <label>
                      <strong>Customer:</strong>
                    </label>{" "}
                    {currentCustomer.customername}
                  </div>
                  <div>
                    <label>
                      <strong>postalcode:</strong>
                    </label>{" "}
                    {currentCustomer.postalcode}
                  </div>
                  <div>
                  </div>
    
                  <Link
                    to={"/customers/" + currentCustomer.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Customer...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
    }
    