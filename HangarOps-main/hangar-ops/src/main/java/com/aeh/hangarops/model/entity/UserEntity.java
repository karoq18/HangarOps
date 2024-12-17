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
@Entity(name = "USERS")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name = "email")
    private String email;
    @Column(name = "organization")
    private String organization;
    @Column(name = "position")
    private String position;
    @Column(name = "role")
    private String role;
    @Column(name = "avaiable")
    private Boolean available;

    public UserEntity(String username, String password, String email,
                      String organization,String position, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.organization = organization;
        this.position = position;
        this.role = role;
        this.available = true;
    }

}
