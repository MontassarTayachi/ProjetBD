package com.example.backend.Controller;

import com.example.backend.Model.Participation;
import com.example.backend.Service.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/participations")
@CrossOrigin(origins = "*")
public class ParticipationController {

    private final ParticipationService participationService;

    @Autowired
    public ParticipationController(ParticipationService participationService) {
        this.participationService = participationService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participation> getParticipationById(@PathVariable Long id) {
        Participation participation = participationService.getParticipationById(id);
        if (participation != null) {
            return ResponseEntity.ok(participation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Participation>> getAllParticipations() {
        List<Participation> participations = participationService.getAllParticipations();
        return ResponseEntity.ok(participations);
    }
    @GetMapping
    public ResponseEntity<?> getParticipations(
            @RequestParam(required = false) Long formationId,
            @RequestParam(required = false) Long participantId,
            @RequestParam(required = false) boolean recentParticipations,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Long participationId) {

        if (participationId != null) {
            // Retourner une seule participation
            Participation participation = participationService.getParticipationById(participationId);
            return ResponseEntity.ok(participation);
        } else if (participantId != null) {
            List<Participation> participations = participationService.getParticipationsByParticipantId(participantId);
            return ResponseEntity.ok(participations);
        } else if (formationId != null) {
            List<Participation> participations = participationService.getParticipationsByFormationId(formationId);
            return ResponseEntity.ok(participations);
        } else if (recentParticipations) {
            if (limit == null || limit <= 0) {
                return ResponseEntity.badRequest().body("Limit must be a positive integer.");
            }
            List<Participation> participations = participationService.getRecentParticipations(limit);
            return ResponseEntity.ok(participations);

        } else {
            List<Participation> participations = participationService.getAllParticipations();
            return ResponseEntity.ok(participations);
        }
    }

    @PostMapping
    public ResponseEntity<Participation> addParticipation(@RequestBody Participation participation) {
        participation.setDate_inscription(LocalDateTime.now());
        Participation created = participationService.createParticipation(participation);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipation(@PathVariable Long id) {
        participationService.deleteParticipation(id);
        return ResponseEntity.noContent().build();
    }



}
