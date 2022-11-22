import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { withRouter } from '../common/with-router';

class Customer extends Component
{
    constructor(props)
    {
        super(props);
        this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
        this.onChangePostalCode = this.onChangePostalCode.bind(this);
        this.getCustomer = this.getCustomer.bind(this);

        this.state = {
            currentCustomer: {
              id: null,
              customername: "",
              postalcode: ""
            },
            message: ""
          };
    }

    componentDidMount() {
        this.getCustomer(this.props.router.params.id);
      }

      onChangeCustomerName(e) {
        const customername = e.target.value;

        this,setState(function(prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    customername:customername
                }
            };
        });

      }

      getCustomer(id) {
        CustomerDataService.get(id)
          .then(response => {
            this.setState({
              currentCustomer: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } 
      
      render() {
        const { currentCustomer } = this.state;
    
        return (
          <div>
            {currentCustomer ? (
              <div className="edit-form">
                <h4>Customer</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="customername">customername</label>
                    <input
                      type="text"
                      className="form-control"
                      id="customername"
                      value={currentCustomer.customername}
                      onChange={this.onChangeCustomerName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postalcode">postalcode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="postalcode"
                      value={currentCustomer.postalcode}
                      onChange={this.onChangePostalCode}
                    />
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Customer...</p>
              </div>
            )}
          </div>
        );
      }
    }
    
    export default withRouter(Customer);