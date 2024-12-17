package com.aeh.hangarops.controller;

import com.aeh.hangarops.model.dto.Organization;
import com.aeh.hangarops.model.entity.OrganizationEntity;
import com.aeh.hangarops.repositories.OrganizationRepository;
import com.aeh.hangarops.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Log
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizationController {

    @Autowired
    private final OrganizationRepository organizationRepository;

    private UserRepository userRepository;

    public OrganizationController(OrganizationRepository OrganizationRepository, UserRepository userRepository) {
        this.organizationRepository = OrganizationRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/add-organization")
    public ResponseEntity<String> addOrganization(@RequestBody OrganizationEntity organization) {
        organizationRepository.save(new OrganizationEntity(organization.getName(), //TODO: Check record exists
                organization.getContact(),
                //organization.getMechanics(),
                organization.getLicenses(),
                organization.getTypes()));
        organizationRepository.flush();
        log.info("Organization added successfully");
        return ResponseEntity.ok("Organization added successfully");
    }

    @GetMapping("/get-organizations")
    public List<Organization> getOrganizations() {
        List<OrganizationEntity> organizations = organizationRepository.findAll();
        List<Organization> organizationDTOs = new ArrayList<>();
        for (OrganizationEntity organization : organizations) {
            int mechanicsCount = userRepository.countByPositionAndOrganizationMechanic(organization.getName());
            int logisticsCount = userRepository.countByPositionAndOrganizationLogistic(organization.getName());
            Organization dto = new Organization(
                    organization.getId(),
                    organization.getName(),
                    organization.getContact(),
                    mechanicsCount,
                    logisticsCount,
                    organization.getLicenses(),
                    organization.getTypes()
            );
            organizationDTOs.add(dto);
        }
        return organizationDTOs;
    }

    @GetMapping("/names-organization")
    public List<String> getOrganizationNames() {
        return organizationRepository.findAll().stream()
          .map(OrganizationEntity::getName)
          .collect(Collectors.toList());
    }

    @GetMapping("/get-organization/{id}")
    public Organization getOrganization(@PathVariable Long id) {
        OrganizationEntity organizationEntity = organizationRepository.findById(id).orElse(null);
        if (organizationEntity != null) {
            return new Organization(
                    organizationEntity.getId(),
                    organizationEntity.getName(),
                    organizationEntity.getContact(),
                    organizationEntity.getLicenses(),
                    organizationEntity.getTypes());
        }
        return null;
    }

    @DeleteMapping("/delete-organization/{id}")
    public ResponseEntity<String> deleteOrganization(@PathVariable Long id) {
        organizationRepository.deleteById(id);
        organizationRepository.flush();
        log.info("Organization deleted successfully");
        return ResponseEntity.ok("Organization deleted successfully");
    }

    @PutMapping("/update-organization/{id}")
    public ResponseEntity<String> updateOrganization(@PathVariable Long id, @RequestBody OrganizationEntity organization) {
        OrganizationEntity organizationEntity = organizationRepository.findById(id).orElse(null);
        if (organizationEntity != null) {
            organizationEntity.setName(organization.getName());
            organizationEntity.setContact(organization.getContact());
            organizationEntity.setLicenses(organization.getLicenses());
            organizationEntity.setTypes(organization.getTypes());
            organizationRepository.save(organizationEntity);
            organizationRepository.flush();
            log.info("Organization updated successfully");
            return ResponseEntity.ok("Organization updated successfully");
        }
        log.info("Organization not found");
        return ResponseEntity.ok("Organization not found");
    }
}
