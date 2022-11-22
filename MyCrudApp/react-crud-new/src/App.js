import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import AddTutorial from "./components/add-tutorial.component";
// import Tutorial from "./components/tutorial.component";
// import TutorialsList from "./components/tutorials-list.component";

import AddCustomer from "./components/add-customer.component";
import Customer from "./components/customer.component";
import CustomersList from "./components/customers-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/customers"} className="navbar-brand">
            Customer Platform
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/customers"} className="nav-link">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<CustomersList/>} />
            <Route path="/customers" element={<CustomersList/>} />
            <Route path="/add" element={<AddCustomer/>} />
            <Route path="/customers/:id" element={<Customer/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;