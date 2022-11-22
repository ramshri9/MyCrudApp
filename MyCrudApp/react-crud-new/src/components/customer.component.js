import React, { Component } from "react";
import customerDataService from "../services/customer.service";
import { withRouter } from '../common/with-router';

class customer extends Component {
  constructor(props) {
    super(props);
    this.onChangecustomername = this.onChangecustomername.bind(this);
    this.onChangepostalcode = this.onChangepostalcode.bind(this);
    this.onChangeincome = this.onChangeincome.bind(this);
    this.onChangeexpense = this.onChangeexpense.bind(this);
    this.onChangepropertyvalue = this.onChangepropertyvalue.bind(this);
    this.getcustomer = this.getcustomer.bind(this);
    this.updatecustomer = this.updatecustomer.bind(this);
    this.deletecustomer = this.deletecustomer.bind(this);

    this.state = {
      currentcustomer: {
        id: null,
        customername: "",
        postalcode: "",
        income:"",
        expense:"",
        propertyvalue:""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getcustomer(this.props.router.params.id);
  }

  onChangecustomername(e) {
    const customername = e.target.value;

    this.setState(function(prevState) {
      return {
        currentcustomer: {
          ...prevState.currentcustomer,
          customername: customername
        }
      };
    });
  }

  onChangepostalcode(e) {
    const postalcode = e.target.value;
    
    this.setState(prevState => ({
      currentcustomer: {
        ...prevState.currentcustomer,
        postalcode: postalcode
      }
    }));
  }

  onChangeincome(e) {
    const income = e.target.value;

    this.setState(function(prevState) {
      return {
        currentcustomer: {
          ...prevState.currentcustomer,
          income: income
        }
      };
    });
  }

  onChangeexpense(e) {
    const expense = e.target.value;

    this.setState(function(prevState) {
      return {
        currentcustomer: {
          ...prevState.currentcustomer,
          expense: expense
        }
      };
    });
  }

  onChangepropertyvalue(e) {
    const propertyvalue = e.target.value;

    this.setState(function(prevState) {
      return {
        currentcustomer: {
          ...prevState.currentcustomer,
          propertyvalue: propertyvalue
        }
      };
    });
  }


  getcustomer(id) {
    customerDataService.get(id)
      .then(response => {
        this.setState({
          currentcustomer: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // updatePublished(status) {
    // var data = {
      // id: this.state.currentcustomer.id,
      // customername: this.state.currentcustomer.customername,
      // postalcode: this.state.currentcustomer.postalcode
    // };

    // customerDataService.update(this.state.currentcustomer.id, data)
      // .then(response => {
        // this.setState(prevState => ({
          // currentcustomer: {
            // ...prevState.currentcustomer
          // }
        // }));
        // console.log(response.data);
      // })
      // .catch(e => {
        // console.log(e);
      // });
  // }

  updatecustomer() {
    customerDataService.update(
      this.state.currentcustomer.id,
      this.state.currentcustomer
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The customer was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletecustomer() {    
    customerDataService.delete(this.state.currentcustomer.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/customers');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentcustomer } = this.state;

    return (
      <div>
        {currentcustomer ? (
          <div className="edit-form">
            <h4>customer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="customername">customername</label>
                <input
                  type="text"
                  className="form-control"
                  id="customername"
                  value={currentcustomer.customername}
                  onChange={this.onChangecustomername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalcode">postalcode</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalcode"
                  value={currentcustomer.postalcode}
                  onChange={this.onChangepostalcode}
                />
              </div>
              <div className="form-group">
                <label htmlFor="income">income</label>
                <input
                  type="text"
                  className="form-control"
                  id="income"
                  value={currentcustomer.income}
                  onChange={this.onChangeincome}
                />
              </div>              
              <div className="form-group">
                <label htmlFor="expense">expense</label>
                <input
                  type="text"
                  className="form-control"
                  id="expense"
                  value={currentcustomer.expense}
                  onChange={this.onChangeexpense}
                />
              </div>
              <div className="form-group">
                <label htmlFor="propertyvalue">propertyvalue</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyvalue"
                  value={currentcustomer.propertyvalue}
                  onChange={this.onChangepropertyvalue}
                />
              </div>
            </form>

          

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletecustomer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatecustomer}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a customer...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(customer);