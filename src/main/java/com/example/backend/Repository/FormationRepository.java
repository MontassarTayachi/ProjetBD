package com.example.backend.Repository;

import com.example.backend.Model.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FormationRepository extends JpaRepository<Formation,Long> {
    @Query("SELECT f.domaine.libelle, COUNT(f) FROM Formation f GROUP BY f.domaine.libelle")
    List<Object[]> countFormationsByDomaine();
}
