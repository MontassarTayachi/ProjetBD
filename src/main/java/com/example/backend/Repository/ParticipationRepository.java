package com.example.backend.Repository;

import com.example.backend.Model.Participation;
import com.example.backend.Model.Formation;
import com.example.backend.Model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    List<Participation> findByParticipantId(Long participantId);

    List<Participation> findByFormationId(Long formationId);
    @Query(value = "SELECT * FROM participation ORDER BY date_inscription DESC LIMIT :limit", nativeQuery = true)
    List<Participation> findRecentParticipations(@Param("limit") int limit);

}
