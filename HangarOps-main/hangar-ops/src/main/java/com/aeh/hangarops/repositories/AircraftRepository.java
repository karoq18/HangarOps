package com.aeh.hangarops.repositories;

import com.aeh.hangarops.model.entity.AircraftEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AircraftRepository extends JpaRepository<AircraftEntity, Long> {
}
