package com.example.backend.Repository;

import com.example.backend.Model.Profil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfilRepository extends JpaRepository<Profil,Long> {
    Optional<Profil> findByLibelle(String libelle);
}
