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
@Entity(name = "ORGANIZATIONS")
public class OrganizationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column
    private String contact;
    @Column(name = "license")
    private int licenses;
    @Column(name = "aircraftTypes")
    private String types;


    public OrganizationEntity(String name, String contact, int licenses, String types) {
        this.name = name;
        this.contact = contact;
        this.licenses = licenses;
        this.types = types;
    }
}
