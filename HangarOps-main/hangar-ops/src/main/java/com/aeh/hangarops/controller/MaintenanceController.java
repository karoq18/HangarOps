package com.aeh.hangarops.controller;

import com.aeh.hangarops.model.entity.MaintenanceEntity;
import com.aeh.hangarops.repositories.MaintenanceRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@Log
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MaintenanceController {

    @Autowired
    private final MaintenanceRepository maintenanceRepository;

    public MaintenanceController(MaintenanceRepository maintenanceRepository) {
        this.maintenanceRepository = maintenanceRepository;
    }

    @PostMapping("/add-maintenance")
    public ResponseEntity<String> addMaintenance(@RequestBody MaintenanceEntity maintenance) throws ParseException {
        maintenanceRepository.save(new MaintenanceEntity(maintenance.getAircraft(),
                maintenance.getOrganization(),
                maintenance.getDescription(),
                maintenance.getStatus(),
                maintenance.getLocation(),
                maintenance.getMechanic(),
                maintenance.getPilot(),
                maintenance.getStartDate(),
                maintenance.getCompletionDate()));
        maintenanceRepository.flush();
        log.info("Maintenance added successfully");
        return ResponseEntity.ok("Maintenance added successfully");
    }

    @GetMapping("/get-maintenances")
    public Iterable<MaintenanceEntity> getMaintenances() {
        return maintenanceRepository.findAll();
    }

    @GetMapping("/get-maintenance/{id}")
    public MaintenanceEntity getMaintenance(@PathVariable Long id) {
        return maintenanceRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/delete-maintenance/{id}")
    public ResponseEntity<String> deleteMaintenance(@PathVariable Long id) {
        maintenanceRepository.deleteById(id);
        maintenanceRepository.flush();
        log.info("Maintenance deleted successfully");
        return ResponseEntity.ok("Maintenance deleted successfully");
    }

    @PutMapping("/update-maintenance/{id}")
    public ResponseEntity<String> updateMaintenance(@PathVariable Long id, @RequestBody MaintenanceEntity maintenance) {
        MaintenanceEntity maintenanceEntity = maintenanceRepository.findById(id).orElse(null);
        if (maintenanceEntity != null) {
            maintenanceEntity.setAircraft(maintenance.getAircraft());
            maintenanceEntity.setOrganization(maintenance.getOrganization());
            maintenanceEntity.setDescription(maintenance.getDescription());
            maintenanceEntity.setStatus(maintenance.getStatus());
            maintenanceEntity.setLocation(maintenance.getLocation());
            maintenanceEntity.setMechanic(maintenance.getMechanic());
            maintenanceEntity.setPilot(maintenance.getPilot());
            maintenanceEntity.setStartDate(maintenance.getStartDate());
            maintenanceEntity.setCompletionDate(maintenance.getCompletionDate());
            maintenanceRepository.save(maintenanceEntity);
            maintenanceRepository.flush();
            log.info("Maintenance updated successfully");
            return ResponseEntity.ok("Maintenance updated successfully");
        }
        return ResponseEntity.ok("Maintenance not found");
    }
}
