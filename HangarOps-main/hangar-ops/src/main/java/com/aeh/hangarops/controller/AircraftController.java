package com.aeh.hangarops.controller;

import com.aeh.hangarops.model.entity.AircraftEntity;
import com.aeh.hangarops.repositories.AircraftRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AircraftController {

    @Autowired
    private final AircraftRepository aircraftRepository;

    public AircraftController(AircraftRepository aircraftRepository) {
        this.aircraftRepository = aircraftRepository;
    }

    @PostMapping("/add-aircraft")
    public ResponseEntity<String> addAircraft(@RequestBody AircraftEntity aircraft) {
        aircraftRepository.save(new AircraftEntity(aircraft.getRegister(),
                aircraft.getModel(),
                aircraft.getType()));
        aircraftRepository.flush();
        log.info("Aircraft added successfully");
        return ResponseEntity.ok("Aircraft added successfully");
    }

    @GetMapping("/get-aircrafts")
    public Iterable<AircraftEntity> getAircrafts() {
        return aircraftRepository.findAll();
    }

    @GetMapping("/get-aircraft/{id}")
    public AircraftEntity getAircraft(@PathVariable Long id) {
        return aircraftRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/delete-aircraft/{id}")
    public ResponseEntity<String> deleteAircraft(@PathVariable Long id) {
        aircraftRepository.deleteById(id);
        aircraftRepository.flush();
        log.info("Aircraft deleted successfully");
        return ResponseEntity.ok("Aircraft deleted successfully");
    }

    @PutMapping("/update-aircraft/{id}")
    public ResponseEntity<String> updateAircraft(@PathVariable Long id, @RequestBody AircraftEntity aircraft) {
        AircraftEntity aircraftEntity = aircraftRepository.findById(id).orElse(null);
        if (aircraftEntity != null) {
            aircraftEntity.setRegister(aircraft.getRegister());
            aircraftEntity.setModel(aircraft.getModel());
            aircraftEntity.setType(aircraft.getType());
            aircraftRepository.save(aircraftEntity);
            aircraftRepository.flush();
            log.info("Aircraft updated successfully");
            return ResponseEntity.ok("Aircraft updated successfully");
        }
        return ResponseEntity.ok("Aircraft not found");
    }
}
