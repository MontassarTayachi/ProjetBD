package com.example.backend.Repository;

import com.example.backend.Model.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DomaineRepository extends JpaRepository<Domaine ,Long> {
    Optional<Domaine> findByLibelle(String libelle);
    boolean existsByLibelle(String libelle);  // More efficient check

}
