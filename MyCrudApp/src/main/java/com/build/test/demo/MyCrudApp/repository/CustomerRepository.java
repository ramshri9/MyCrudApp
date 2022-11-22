package com.build.test.demo.MyCrudApp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.build.test.demo.MyCrudApp.model.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String> {
  List<Customer> findByCustomerNameContaining(String CustomerName);
}