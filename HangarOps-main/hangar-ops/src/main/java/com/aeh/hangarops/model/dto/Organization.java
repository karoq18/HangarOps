package com.aeh.hangarops.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Organization {
    private Long id;
    private String name;
    private String contact;
    private int mechanics;
    private int logistics;
    private int licenses;
    private String types;

    public Organization(Long id, String name, String contact, int mechanics, int logistics, int licenseCount, String types) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.mechanics = mechanics;
        this.logistics = logistics;
        this.licenses = licenseCount;
        this.types = types;
    }

    public Organization(Long id, String name, String contact, int licenseCount, String types) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.licenses = licenseCount;
        this.types = types;
    }

}
