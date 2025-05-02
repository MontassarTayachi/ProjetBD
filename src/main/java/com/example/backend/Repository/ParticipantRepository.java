package com.example.backend.Repository;

import com.example.backend.Model.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant ,Long> {
    Optional<Participant> findByEmail(String email);
    boolean existsByEmail(String email);
    Page<Participant> findByStructureId(Long structureId, Pageable pageable);
}
