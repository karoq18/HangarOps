package com.aeh.hangarops.repositories;

import com.aeh.hangarops.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT COUNT(u) FROM USERS u WHERE u.position = 'Mechanic' AND u.organization = ?1")
    int countByPositionAndOrganizationMechanic(String name);

    @Query("SELECT COUNT(u) FROM USERS u WHERE u.position = 'Logistic' AND u.organization = ?1")
    int countByPositionAndOrganizationLogistic(String name);

    UserEntity findByUsername(String username);

    List<UserEntity> findByPositionAndAvailable(String position, boolean b);
}
