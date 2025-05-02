package com.example.backend.Repository;

import com.example.backend.Model.Historique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HistoriqueRepository extends JpaRepository<Historique,Long> {
    @Query(value = "SELECT * FROM historique ORDER BY date DESC", nativeQuery = true)
    List<Historique> findAllHistorique();
}
