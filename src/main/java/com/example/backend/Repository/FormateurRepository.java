package com.example.backend.Repository;

import com.example.backend.Model.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormateurRepository extends JpaRepository<Formateur,Long> {
    boolean existsByEmail(String email);
}
