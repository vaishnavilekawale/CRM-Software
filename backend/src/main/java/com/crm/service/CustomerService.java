package com.crm.service;

import com.crm.dto.CustomerDto;
import com.crm.model.Customer;
import com.crm.model.User;
import com.crm.repository.CustomerRepository;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    public CustomerDto createCustomer(CustomerDto customerDto) {
        Customer customer = new Customer();
        customer.setName(customerDto.getName());
        customer.setEmail(customerDto.getEmail());
        customer.setPhone(customerDto.getPhone());
        customer.setCompany(customerDto.getCompany());
        customer.setAddress(customerDto.getAddress());
        customer.setNotes(customerDto.getNotes());

        if (customerDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(customerDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            customer.setAssignedTo(assignedTo);
        }

        Customer savedCustomer = customerRepository.save(customer);
        return convertToDto(savedCustomer);
    }

    public CustomerDto updateCustomer(Long id, CustomerDto customerDto) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        customer.setName(customerDto.getName());
        customer.setEmail(customerDto.getEmail());
        customer.setPhone(customerDto.getPhone());
        customer.setCompany(customerDto.getCompany());
        customer.setAddress(customerDto.getAddress());
        customer.setNotes(customerDto.getNotes());

        if (customerDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(customerDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            customer.setAssignedTo(assignedTo);
        }

        Customer updatedCustomer = customerRepository.save(customer);
        return convertToDto(updatedCustomer);
    }

    public CustomerDto getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return convertToDto(customer);
    }

    public Page<CustomerDto> getAllCustomers(Pageable pageable) {
        return customerRepository.findAll(pageable).map(this::convertToDto);
    }

    public Page<CustomerDto> searchCustomersByName(String name, Pageable pageable) {
        return customerRepository.findByNameContainingIgnoreCase(name, pageable).map(this::convertToDto);
    }

    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found");
        }
        customerRepository.deleteById(id);
    }

    private CustomerDto convertToDto(Customer customer) {
        CustomerDto dto = new CustomerDto();
        dto.setId(customer.getId());
        dto.setName(customer.getName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());
        dto.setCompany(customer.getCompany());
        dto.setAddress(customer.getAddress());
        dto.setNotes(customer.getNotes());
        dto.setCreatedAt(customer.getCreatedAt());
        dto.setUpdatedAt(customer.getUpdatedAt());

        if (customer.getAssignedTo() != null) {
            dto.setAssignedToId(customer.getAssignedTo().getId());
            dto.setAssignedToName(customer.getAssignedTo().getFullName());
        }

        return dto;
    }
}
