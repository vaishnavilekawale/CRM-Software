package com.crm.service;

import com.crm.dto.LeadDto;
import com.crm.model.Lead;
import com.crm.model.User;
import com.crm.repository.LeadRepository;
import com.crm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private UserRepository userRepository;

    public LeadDto createLead(LeadDto leadDto) {
        Lead lead = new Lead();
        lead.setName(leadDto.getName());
        lead.setEmail(leadDto.getEmail());
        lead.setPhone(leadDto.getPhone());
        lead.setCompany(leadDto.getCompany());
        lead.setNotes(leadDto.getNotes());

        try {
            lead.setSource(Lead.LeadSource.valueOf(leadDto.getSource().toUpperCase()));
            lead.setStatus(Lead.LeadStatus.valueOf(leadDto.getStatus().toUpperCase()));
        } catch (IllegalArgumentException e) {
            lead.setSource(Lead.LeadSource.WEB);
            lead.setStatus(Lead.LeadStatus.NEW);
        }

        if (leadDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(leadDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            lead.setAssignedTo(assignedTo);
        }

        Lead savedLead = leadRepository.save(lead);
        return convertToDto(savedLead);
    }

    public LeadDto updateLead(Long id, LeadDto leadDto) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        lead.setName(leadDto.getName());
        lead.setEmail(leadDto.getEmail());
        lead.setPhone(leadDto.getPhone());
        lead.setCompany(leadDto.getCompany());
        lead.setNotes(leadDto.getNotes());

        try {
            lead.setSource(Lead.LeadSource.valueOf(leadDto.getSource().toUpperCase()));
            lead.setStatus(Lead.LeadStatus.valueOf(leadDto.getStatus().toUpperCase()));
        } catch (IllegalArgumentException e) {
            // Keep existing values
        }

        if (leadDto.getAssignedToId() != null) {
            User assignedTo = userRepository.findById(leadDto.getAssignedToId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            lead.setAssignedTo(assignedTo);
        }

        Lead updatedLead = leadRepository.save(lead);
        return convertToDto(updatedLead);
    }

    public LeadDto getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        return convertToDto(lead);
    }

    public Page<LeadDto> getAllLeads(Pageable pageable) {
        return leadRepository.findAll(pageable).map(this::convertToDto);
    }

    public Page<LeadDto> getLeadsByStatus(String status, Pageable pageable) {
        try {
            Lead.LeadStatus leadStatus = Lead.LeadStatus.valueOf(status.toUpperCase());
            return leadRepository.findByStatus(leadStatus, pageable).map(this::convertToDto);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }

    public Page<LeadDto> getLeadsBySource(String source, Pageable pageable) {
        try {
            Lead.LeadSource leadSource = Lead.LeadSource.valueOf(source.toUpperCase());
            return leadRepository.findBySource(leadSource, pageable).map(this::convertToDto);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid source: " + source);
        }
    }

    public void deleteLead(Long id) {
        if (!leadRepository.existsById(id)) {
            throw new RuntimeException("Lead not found");
        }
        leadRepository.deleteById(id);
    }

    private LeadDto convertToDto(Lead lead) {
        LeadDto dto = new LeadDto();
        dto.setId(lead.getId());
        dto.setName(lead.getName());
        dto.setEmail(lead.getEmail());
        dto.setPhone(lead.getPhone());
        dto.setCompany(lead.getCompany());
        dto.setNotes(lead.getNotes());
        dto.setSource(lead.getSource().toString());
        dto.setStatus(lead.getStatus().toString());
        dto.setCreatedAt(lead.getCreatedAt());
        dto.setUpdatedAt(lead.getUpdatedAt());

        if (lead.getAssignedTo() != null) {
            dto.setAssignedToId(lead.getAssignedTo().getId());
            dto.setAssignedToName(lead.getAssignedTo().getFullName());
        }

        return dto;
    }
}
