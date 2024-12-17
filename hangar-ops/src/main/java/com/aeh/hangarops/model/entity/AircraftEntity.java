package com.aeh.hangarops.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity(name = "AIRCRAFTS")
public class AircraftEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String register;
    @Column
    private String model;
    @Column
    private String type;

    public AircraftEntity(String register, String model, String type) {
        this.register = register;
        this.model = model;
        this.type = type;
    }
}
