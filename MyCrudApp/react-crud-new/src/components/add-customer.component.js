import React, { Component } from "react";
import customerDataService from "../services/customer.service";

export default class Addcustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangecustomername = this.onChangecustomername.bind(this);
    this.onChangepostalcode = this.onChangepostalcode.bind(this);
    this.onChangeincome = this.onChangeincome.bind(this);
    this.onChangeexpense = this.onChangeexpense.bind(this);
    this.onChangepropertyvalue = this.onChangepropertyvalue.bind(this);    
    this.savecustomer = this.savecustomer.bind(this);
    this.newcustomer = this.newcustomer.bind(this);

    this.state = {
      id: null,
      customerName: "",
      postalCode: "",
      income:"",
      expense:"",
      propertyValue:""
    };
  }

  onChangecustomername(e) {
    this.setState({
      customerName: e.target.value
    });
  }

  onChangepostalcode(e) {
    this.setState({
      postalCode: e.target.value
    });
  }

  onChangeincome(e) {
    this.setState({
      income: e.target.value
    });
  }

  onChangeexpense(e) {
    this.setState({
      expense: e.target.value
    });
  }

  onChangepropertyvalue(e) {
    this.setState({
      propertyValue: e.target.value
    });
  }

  savecustomer() {
    var data = {
      customerName: this.state.customerName,
      postalCode: this.state.postalCode,
      income: this.state.income,
      expense: this.state.expense,
      propertyValue: this.state.propertyValue
    };

    customerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          customerName: response.data.customerName,
          postalCode: response.data.postalCode,
          income: response.data.income,
          expense: response.data.expense,
          propertyValue: response.data.propertyValue
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newcustomer() {
    this.setState({
      id: null,
      customerName: "",
      postalCode: "",
      income: "",
      expense:"",
      propertyValue:""
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newcustomer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="customername">customername</label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                required
                value={this.state.customerName}
                onChange={this.onChangecustomername}
                name="customerName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalcode">postalcode</label>
              <input
                type="text"
                className="form-control"
                id="postalCode"
                required
                value={this.state.postalCode}
                onChange={this.onChangepostalcode}
                name="postalCode"
              />
            </div>

            <div className="form-group">
              <label htmlFor="income">income</label>
              <input
                type="number"
                className="form-control"
                id="income"
                required
                value={this.state.income}
                onChange={this.onChangeincome}
                name="income"
              />
            </div>       

            <div className="form-group">
              <label htmlFor="expense">expense</label>
              <input
                type="number"
                className="form-control"
                id="expense"
                required
                value={this.state.expense}
                onChange={this.onChangeexpense}
                name="expense"
              />
            </div>    

            <div className="form-group">
              <label htmlFor="propertyvalue">propertyValue</label>
              <input
                type="number"
                className="form-control"
                id="propertyValue"
                required
                value={this.state.propertyValue}
                onChange={this.onChangepropertyvalue}
                name="propertyValue"
              />
            </div>   

            <button onClick={this.savecustomer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
