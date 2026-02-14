package com.crm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaleDto {
    private Long id;
    private Long customerId;
    private String customerName;
    private BigDecimal amount;
    private String status;
    private LocalDate saleDate;
    private Long assignedToId;
    private String assignedToName;
    private String description;
    private String productName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
