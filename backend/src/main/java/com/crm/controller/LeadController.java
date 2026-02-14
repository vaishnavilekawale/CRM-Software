package com.crm.controller;

import com.crm.dto.ApiResponse;
import com.crm.dto.LeadDto;
import com.crm.service.LeadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leads")
@Tag(name = "Lead Controller", description = "API for lead management")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping
    public ResponseEntity<ApiResponse> createLead(@RequestBody LeadDto leadDto) {
        try {
            LeadDto created = leadService.createLead(leadDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Lead created successfully", created));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Error creating lead: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllLeads(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<LeadDto> leads = leadService.getAllLeads(pageable);
            return ResponseEntity.ok(new ApiResponse(true, "Leads fetched successfully", leads));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error fetching leads: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getLeadById(@PathVariable Long id) {
        try {
            LeadDto lead = leadService.getLeadById(id);
            return ResponseEntity.ok(new ApiResponse(true, "Lead fetched successfully", lead));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, "Error fetching lead: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateLead(@PathVariable Long id, @RequestBody LeadDto leadDto) {
        try {
            LeadDto updated = leadService.updateLead(id, leadDto);
            return ResponseEntity.ok(new ApiResponse(true, "Lead updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Error updating lead: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteLead(@PathVariable Long id) {
        try {
            leadService.deleteLead(id);
            return ResponseEntity.ok(new ApiResponse(true, "Lead deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, "Error deleting lead: " + e.getMessage()));
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse> getLeadsByStatus(
            @PathVariable String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<LeadDto> leads = leadService.getLeadsByStatus(status, pageable);
            return ResponseEntity.ok(new ApiResponse(true, "Leads filtered by status", leads));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Error filtering leads: " + e.getMessage()));
        }
    }

    @GetMapping("/source/{source}")
    public ResponseEntity<ApiResponse> getLeadsBySource(
            @PathVariable String source,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<LeadDto> leads = leadService.getLeadsBySource(source, pageable);
            return ResponseEntity.ok(new ApiResponse(true, "Leads filtered by source", leads));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Error filtering leads: " + e.getMessage()));
        }
    }
}
