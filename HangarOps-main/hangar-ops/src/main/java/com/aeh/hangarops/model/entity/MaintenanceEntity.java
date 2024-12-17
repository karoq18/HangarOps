package com.aeh.hangarops.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity(name = "MAINTENANCE")
public class MaintenanceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "aircraft")
    private String aircraft;
    @Column(name = "organization")
    private String organization;
    @Column(name = "description")
    private String description;
    @Column(name = "status")
    private String status;
    @Column(name = "location")
    private String location;
    @Column(name = "mechanic")
    private String mechanic;
    @Column(name = "pilot")
    private String pilot;
    @Column(name = "startDate")
    private Date startDate;
    @Column(name = "completionDate")
    private Date completionDate;

    public MaintenanceEntity(String aircraft, String organization, String description, String status, String location, String mechanic, String pilot, Date startDate, Date completionDate) {
        this.aircraft = aircraft;
        this.organization = organization;
        this.description = description;
        this.status = status;
        this.location = location;
        this.mechanic = mechanic;
        this.pilot = pilot;
        this.startDate = startDate;
        this.completionDate = completionDate;
    }

    public MaintenanceEntity(String aircraft, String organization, String description, String status, String location, String mechanic, String pilot, String startDate, String completionDate) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        this.aircraft = aircraft;
        this.organization = organization;
        this.description = description;
        this.status = status;
        this.location = location;
        this.mechanic = mechanic;
        this.pilot = pilot;
        this.startDate = dateFormat.parse(startDate);
        this.completionDate = dateFormat.parse(completionDate);
    }
}
