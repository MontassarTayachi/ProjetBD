package com.example.backend.Repository;

import com.example.backend.Model.Structure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StructureRepository extends JpaRepository<Structure, Long> {
    Optional<Structure> findByLibelle(String libelle);
}
