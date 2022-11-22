package com.build.test.demo.MyCrudApp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.build.test.demo.MyCrudApp.model.Customer;
import com.build.test.demo.MyCrudApp.repository.CustomerRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class CustomerController {

  @Autowired
  CustomerRepository customerRepository;

  @GetMapping("/customers")
  public ResponseEntity<List<Customer>> getAllCustomers(@RequestParam(required = false) String customername) {
    try {
      List<Customer> customers = new ArrayList<Customer>();

      if (customername == null)
    	  customerRepository.findAll().forEach(customers::add);
      else
    	  customerRepository.findByCustomerNameContaining(customername).forEach(customers::add);

      if (customers.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(customers, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/customers/{id}")
  public ResponseEntity<Customer> getCustomerById(@PathVariable("id") String id) {
    Optional<Customer> customerData = customerRepository.findById(id);

    if (customerData.isPresent()) {
      return new ResponseEntity<>(customerData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/customers")
  public ResponseEntity<Customer> createcustomer(@RequestBody Customer customer) {
    try {
    	System.out.println("This is the customer name");
    	System.out.println(customer.getCustomerName());
    	Customer _customer = customerRepository.save(new Customer(customer.getCustomerName(), customer.getPostalCode(),customer.getIncome(), customer.getExpense(),customer.getPropertyValue()));
      return new ResponseEntity<>(_customer, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/customers/{id}")
  public ResponseEntity<Customer> updateCustomer(@PathVariable("id") String id, @RequestBody Customer customer) {
    Optional<Customer> customerData = customerRepository.findById(id);

    if (customerData.isPresent()) {
      Customer _customer = customerData.get();
      _customer.setCustomerName(customer.getCustomerName());
      _customer.setPostalCode(customer.getPostalCode());
      _customer.setIncome(customer.getIncome());
      _customer.setExpense(customer.getExpense());
      _customer.setPropertyValue(customer.getPropertyValue());
      return new ResponseEntity<>(customerRepository.save(_customer), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  /*@DeleteMapping("/tutorials/{id}")
  public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") String id) {
    try {
      tutorialRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/tutorials")
  public ResponseEntity<HttpStatus> deleteAllTutorials() {
    try {
      tutorialRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/tutorials/published")
  public ResponseEntity<List<Tutorial>> findByPublished() {
    try {
      List<Tutorial> tutorials = tutorialRepository.findByPublished(true);

      if (tutorials.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(tutorials, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/

}