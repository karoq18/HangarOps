package com.aeh.hangarops;

import com.aeh.hangarops.model.entity.AircraftEntity;
import com.aeh.hangarops.model.entity.MaintenanceEntity;
import com.aeh.hangarops.model.entity.OrganizationEntity;
import com.aeh.hangarops.model.entity.UserEntity;
import com.aeh.hangarops.repositories.AircraftRepository;
import com.aeh.hangarops.repositories.MaintenanceRepository;
import com.aeh.hangarops.repositories.OrganizationRepository;
import com.aeh.hangarops.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Log
@Component
public class StartupRunner implements CommandLineRunner {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private AircraftRepository aircraftRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Override
    public void run(String... args) throws Exception {

        log.info("Executing startup actions...");
        organizationRepository.save(new OrganizationEntity("Aircraft Maintenance", "John Doe",  3, "2"));
        organizationRepository.save(new OrganizationEntity("Flight School", "Jane Doe", 2, "1"));
        organizationRepository.save(new OrganizationEntity("Aerial Photography", "John Smith", 1, "1"));

        log.info("List of organizations from database:");
        List<OrganizationEntity> organizationFromDatabase = organizationRepository.findAll();
        for (OrganizationEntity organization : organizationFromDatabase) {
            log.info("Retrieved organization: " + organization);
        }
        aircraftRepository.save(new AircraftEntity("N12345", "Cessna 172", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N54321", "Cessna 182", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N98765", "Piper Cherokee", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N67890", "Piper Arrow", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N45678", "Cessna 172", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N23456", "Cessna 182", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N87654", "Piper Cherokee", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N09876", "Piper Arrow", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N76543", "Cessna 172", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N65432", "Cessna 182", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N43210", "Piper Cherokee", "Single Engine"));
        aircraftRepository.save(new AircraftEntity("N87654", "Piper Arrow", "Single Engine"));

        log.info("List of aircraft from database:");
        List<AircraftEntity> aircraftFromDatabase = aircraftRepository.findAll();
        for (AircraftEntity aircraft : aircraftFromDatabase) {
            log.info("Retrieved aircraft: " + aircraft);
        }

        userRepository.save(new UserEntity("John Doe", "xyz", "xyz@company.com", "Aircraft Maintenance", "Mechanic", "User"));
        userRepository.save(new UserEntity("Johnas Does", "xyzx", "xyz@company.com", "Aircraft Maintenance", "Mechanic", "User"));
        userRepository.save(new UserEntity("Johnny Dennis", "yxyzy", "xyz@company.com", "Aircraft Maintenance", "Mechanic", "User"));
        userRepository.save(new UserEntity("Jane Doe", "abc", "xtz@company.com", "Flight School", "Instructor", "User"));
        userRepository.save(new UserEntity("John Smith", "123", "xrz@company.com", "Aerial Photography", "Pilot", "User"));
        userRepository.save(new UserEntity("John Doe", "xyz", "xez@company.com", "Aircraft Maintenance", "Logistic", "User"));
        userRepository.save(new UserEntity("John Doe", "xyz", "xez@company.com", "Aircraft Maintenance", "Logistic", "User"));
        userRepository.save(new UserEntity("Konan Destylator", "konan", "destylacja@bibmber.pl", "Aerial Photography", "Pilot", "User"));
        userRepository.save(new UserEntity("Kapitan Planeta", "kapitan", "szanujzielen@planeta.pl", "Aerial Photography", "Pilot", "User"));
        userRepository.save(new UserEntity("admin", "admin", "admin@admin.com", "admin", "Logistic", "admin"));

        log.info("List of users from database:");
        List<UserEntity> userFromDatabase = userRepository.findAll();
        for (UserEntity user : userFromDatabase) {
            log.info("Retrieved user: " + user);
        }

        try {
            maintenanceRepository.save(new MaintenanceEntity("N12345", "John Doe", "Aircraft Maintenance", "Zakonczona", "Annual Inspection", "Oil Change", "Kapitan Planeta", "1999-03-03", "1999-03-04"));
            maintenanceRepository.save(new MaintenanceEntity("N54321", "Flight School", "Flight School", "Zakonczona", "100 Hour Inspection", "Oil Change", "Konan Destylator", "1999-03-03", "1999-03-04"));
            maintenanceRepository.save(new MaintenanceEntity("N98765", "Aerial Photography","John Smith", "Aktywna", "Annual Inspection", "Oil Change", "John Doe", "2024-05-17", "2024-05-19"));
            maintenanceRepository.save(new MaintenanceEntity("N67890", "Aircraft Maintenance", "John Doe", "Aktywna", "100 Hour Inspection", "Oil Change", "Johnas Does", "2024-05-25", "2024-05-27"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        log.info("List of maintenance from database:");
        List<MaintenanceEntity> maintenanceFromDatabase = maintenanceRepository.findAll();
        for (MaintenanceEntity maintenance : maintenanceFromDatabase) {
            log.info("Retrieved maintenance: " + maintenance);
        }
    }
}
