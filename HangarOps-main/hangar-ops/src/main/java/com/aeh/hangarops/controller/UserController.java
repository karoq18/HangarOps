package com.aeh.hangarops.controller;

import com.aeh.hangarops.model.entity.UserEntity;
import com.aeh.hangarops.repositories.UserRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/add-user")
    public ResponseEntity<String> addUser(@RequestBody UserEntity user) {
        userRepository.save(new UserEntity(user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getOrganization(),
                user.getPosition(),
                user.getRole()));
        userRepository.flush();
        log.info("User added successfully");
        return ResponseEntity.ok("User added successfully");
    }

  @PostMapping("/login")
  public ResponseEntity<Map<String, Object>> login(@RequestBody UserEntity loginRequest) {
    UserEntity user = userRepository. findByUsername(loginRequest.getUsername());
    Map<String, Object> response = new HashMap<>();
    if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
      response.put("message", "Invalid username or password");
      return ResponseEntity.status(401).body(response);
    }
    response.put("message", "Login successful");
    response.put("user", user);
    return ResponseEntity.ok(response);
  }

    @GetMapping("/get-users")
    public Iterable<UserEntity> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/get-user/{id}")
    public UserEntity getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        userRepository.flush();
        log.info("User deleted successfully");
        return ResponseEntity.ok("User deleted successfully");
    }

    @PutMapping("/update-user/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserEntity user) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        if (userEntity != null) {
            userEntity.setUsername(user.getUsername());
            userEntity.setPassword(user.getPassword());
            userEntity.setEmail(user.getEmail());
            userEntity.setOrganization(user.getOrganization());
            userEntity.setPosition(user.getPosition());
            userEntity.setRole(user.getRole());
            userRepository.save(userEntity);
            userRepository.flush();
            log.info("User updated successfully");
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.ok("User not found");
    }

    @GetMapping("/users/positions")
    public List<String> getPositions() {
        return userRepository.findAll().stream()
                .map(UserEntity::getPosition)
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/users/unavailable/{position}")
    public List<UserEntity> getUnavailableUsers(@PathVariable String position) {
        return userRepository.findByPositionAndAvailable(position, false);
    }

    @GetMapping("/users/available/{position}")
    public List<UserEntity> getAvailableUsers(@PathVariable String position) {
        return userRepository.findByPositionAndAvailable(position, true);
    }

    @PutMapping("/update-user-avaibility/{id}")
    public ResponseEntity<String> updateUserAvaibility(@PathVariable Long id, @RequestBody UserEntity user) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        if (userEntity != null) {
            userEntity.setAvailable(user.getAvailable());
            userRepository.save(userEntity);
            userRepository.flush();
            log.info("User updated successfully");
            return ResponseEntity.ok("User updated successfully");
        }
        return ResponseEntity.ok("User not found");
    }

}
