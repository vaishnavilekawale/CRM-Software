package com.crm.service;

import com.crm.dto.SaleDto;
import com.crm.model.Sale;
import com.crm.model.Customer;
import com.crm.model.User;
import com.crm.repository.SaleRepository;
import com.crm.repository.CustomerRepository;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    public SaleDto createSale(SaleDto saleDto) {
        Sale sale = new Sale();

        Customer customer = customerRepository.findById(saleDto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        sale.setCustomer(customer);

        sale.setAmount(saleDto.getAmount());
        sale.setSaleDate(saleDto.getSaleDate());
        sale.setDescription(saleDto.getDescription());
        sale.setProductName(saleDto.getProductName());

        try {
            sale.setStatus(Sale.SaleStatus.valueOf(saleDto.getStatus().toUpperCase()));
        } catch (IllegalArgumentException e) {
            sale.setStatus(Sale.SaleStatus.PROPOSAL);
        }

        if (saleDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(saleDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            sale.setAssignedTo(assignedTo);
        }

        Sale savedSale = saleRepository.save(sale);
        return convertToDto(savedSale);
    }

    public SaleDto updateSale(Long id, SaleDto saleDto) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        if (saleDto.getCustomerId() != null) {
            Customer customer = customerRepository.findById(saleDto.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found"));
            sale.setCustomer(customer);
        }

        sale.setAmount(saleDto.getAmount());
        sale.setSaleDate(saleDto.getSaleDate());
        sale.setDescription(saleDto.getDescription());
        sale.setProductName(saleDto.getProductName());

        try {
            sale.setStatus(Sale.SaleStatus.valueOf(saleDto.getStatus().toUpperCase()));
        } catch (IllegalArgumentException e) {
            // Keep existing value
        }

        if (saleDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(saleDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            sale.setAssignedTo(assignedTo);
        }

        Sale updatedSale = saleRepository.save(sale);
        return convertToDto(updatedSale);
    }

    public SaleDto getSaleById(Long id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));
        return convertToDto(sale);
    }

    public Page<SaleDto> getAllSales(Pageable pageable) {
        return saleRepository.findAll(pageable).map(this::convertToDto);
    }

    public Page<SaleDto> getSalesByStatus(String status, Pageable pageable) {
        try {
            Sale.SaleStatus saleStatus = Sale.SaleStatus.valueOf(status.toUpperCase());
            return saleRepository.findByStatus(saleStatus, pageable).map(this::convertToDto);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }

    public Page<SaleDto> getSalesByUserId(Long userId, Pageable pageable) {
        return saleRepository.findByAssignedToId(userId, pageable).map(this::convertToDto);
    }

    public Page<SaleDto> getSalesByCustomerId(Long customerId, Pageable pageable) {
        return saleRepository.findByCustomerId(customerId, pageable).map(this::convertToDto);
    }

    public void deleteSale(Long id) {
        if (!saleRepository.existsById(id)) {
            throw new RuntimeException("Sale not found");
        }
        saleRepository.deleteById(id);
    }

    private SaleDto convertToDto(Sale sale) {
        SaleDto dto = new SaleDto();
        dto.setId(sale.getId());
        dto.setAmount(sale.getAmount());
        dto.setSaleDate(sale.getSaleDate());
        dto.setStatus(sale.getStatus().toString());
        dto.setDescription(sale.getDescription());
        dto.setProductName(sale.getProductName());
        dto.setCreatedAt(sale.getCreatedAt());
        dto.setUpdatedAt(sale.getUpdatedAt());

        if (sale.getCustomer() != null) {
            dto.setCustomerId(sale.getCustomer().getId());
            dto.setCustomerName(sale.getCustomer().getName());
        }

        if (sale.getAssignedTo() != null) {
            dto.setAssignedToId(sale.getAssignedTo().getId());
            dto.setAssignedToName(sale.getAssignedTo().getFullName());
        }

        return dto;
    }
}
