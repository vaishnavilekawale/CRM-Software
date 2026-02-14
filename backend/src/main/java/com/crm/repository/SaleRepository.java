package com.crm.repository;

import com.crm.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    Page<Sale> findAll(Pageable pageable);
    Page<Sale> findByStatus(Sale.SaleStatus status, Pageable pageable);
    Page<Sale> findByAssignedToId(Long userId, Pageable pageable);
    Page<Sale> findByCustomerId(Long customerId, Pageable pageable);
}
