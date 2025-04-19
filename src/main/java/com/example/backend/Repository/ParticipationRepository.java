package com.example.backend.Repository;

import com.example.backend.DTO.FormationCountDTO;
import com.example.backend.Model.Participation;
import com.example.backend.Model.Formation;
import com.example.backend.Model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    List<Participation> findByParticipantId(Long participantId);

    List<Participation> findByFormationId(Long formationId);
    @Query(value = "SELECT * FROM participation ORDER BY date_inscription DESC LIMIT :limit", nativeQuery = true)
    List<Participation> findRecentParticipations(@Param("limit") int limit);
    @Query("SELECT new com.example.backend.DTO.FormationCountDTO(f.domaine.libelle, COUNT(p)) " +
            "FROM Participation p " +
            "JOIN p.formation f " +
            "GROUP BY f.domaine.libelle")
    List<FormationCountDTO> countParticipationsByDomaine();

    @Query("SELECT MONTH(p.date_inscription), COUNT(p) FROM Participation p GROUP BY MONTH(p.date_inscription) ORDER BY MONTH(p.date_inscription)")
    List<Object[]> countParticipationsByMonth();

    @Query(value = "SELECT EXTRACT(DOW FROM p.date_inscription) AS dayOfWeek, COUNT(*) " +
            "FROM participation p " +
            "WHERE p.date_inscription >= CURRENT_DATE - INTERVAL '7 days' " +
            "GROUP BY EXTRACT(DOW FROM p.date_inscription) " +
            "ORDER BY EXTRACT(DOW FROM p.date_inscription)", nativeQuery = true)
    List<Object[]> countParticipationsByWeekDay();

    @Query(value = "SELECT DATE(p.date_inscription) AS day, COUNT(*) " +
            "FROM participation p " +
            "WHERE p.date_inscription >= CURRENT_DATE - INTERVAL '30 days' " +
            "GROUP BY day " +
            "ORDER BY day", nativeQuery = true)
    List<Object[]> countParticipationsByDayForLast30Days();
    @Query(value = "SELECT \n" +
            "    EXTRACT(MONTH FROM p.date_inscription) AS month,\n" +
            "    COUNT(p.id) " +
            "FROM \n" +
            "    participation p\n" +
            "JOIN \n" +
            "    formation f ON f.id = p.formation_id\n" +
            "WHERE \n" +
            "    (p.nombre_heures::double precision / f.nb_heures) > 0.7\n" +
            "GROUP BY \n" +
            "    EXTRACT(MONTH FROM p.date_inscription)\n" +
            "ORDER BY \n" +
            "    month;\n", nativeQuery = true)
    List<Object[]> countHighAttendanceParticipationsByMonth(@Param("startDate") LocalDateTime startDate);

    @Query(value = "SELECT \n" +
            "    DATE(p.date_inscription) AS day, \n" +
            "    COUNT(p.id) AS participation_count\n" +
            "FROM \n" +
            "    participation p\n" +
            "JOIN \n" +
            "    formation f ON f.id = p.formation_id\n" +
            "WHERE \n" +
            "    (p.nombre_heures::double precision / f.nb_heures) > 0.7\n" +
            "    AND p.date_inscription >= CURRENT_DATE - INTERVAL '30 days'\n" +
            "GROUP BY \n" +
            "    DATE(p.date_inscription)\n" +
            "ORDER BY \n" +
            "    day;\n", nativeQuery = true)
    List<Object[]> countHighAttendanceParticipationsByDay(@Param("startDate") LocalDateTime startDate);}