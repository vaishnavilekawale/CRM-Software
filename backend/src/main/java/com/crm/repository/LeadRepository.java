package com.crm.repository;

import com.crm.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    Page<Lead> findAll(Pageable pageable);
    Page<Lead> findByStatus(Lead.LeadStatus status, Pageable pageable);
    Page<Lead> findByNameContainingIgnoreCase(String name, Pageable pageable);
    Page<Lead> findBySource(Lead.LeadSource source, Pageable pageable);
}
