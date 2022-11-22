package com.build.test.demo.MyCrudApp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "customers")
public class Customer {
  @Id
  private String id;

  private String customername;
  private String postalcode;
  private Integer income;
  private Integer expense;
  private Integer propertyvalue;

  public Customer() {

  }

  public Customer(String customername, String postalcode,Integer income,Integer expense,Integer propertyvalue) {
    this.customername = customername;
    this.postalcode = postalcode;
    this.income=income;
    this.expense=expense;
    this.propertyvalue=propertyvalue;
  }

  public String getId() {
    return id;
  }

  public String getCustomerName() {
    return customername;
  }

  public void setCustomerName(String customername) {
    this.customername = customername;
  }

  public String getPostalCode() {
    return postalcode;
  }

  public void setPostalCode(String postalcode) {
    this.postalcode = postalcode;
  }

  public Integer getIncome() {
	    return income;
  }

  public void setIncome(Integer income) {
	    this.income = income;
  }
  
  public Integer getExpense() {
	    return expense;
  }

  public void setExpense(Integer expense) {
	    this.expense = expense;
  }  

  public Integer getPropertyValue() {
	    return propertyvalue;
  }

  public void setPropertyValue(Integer propertyvalue) {
	    this.propertyvalue = propertyvalue;
  }
  
  @Override
  public String toString() {
    return "Customer [id=" + id + ", customername=" + customername + ", postalcode=" + postalcode + ", income=" + income + ", expense=" + expense + ", propertyvalue=" + propertyvalue +"]";
  }
}