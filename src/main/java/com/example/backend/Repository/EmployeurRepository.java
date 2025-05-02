package com.example.backend.Repository;

import com.example.backend.Model.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeurRepository extends JpaRepository<Employeur,Long> {
    Optional<Employeur> findByNomemployeur(String nomemployeur);
}
