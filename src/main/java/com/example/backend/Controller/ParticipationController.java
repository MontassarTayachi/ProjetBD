package com.example.backend.Controller;

import com.example.backend.Model.Formation;
import com.example.backend.Model.Historique;
import com.example.backend.Model.Participation;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.FormationService;
import com.example.backend.Service.HistoriqueService;
import com.example.backend.Service.ParticipationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/participations")
@CrossOrigin(origins = "*")
public class ParticipationController {

    private final ParticipationService participationService;
    private final FormationService formationService;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private HistoriqueService historiqueService;

    @Autowired
    public ParticipationController(ParticipationService participationService , FormationService formationService) {
        this.participationService = participationService;
        this.formationService=formationService ;
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
        Participation created = participationService.createParticipation(participation);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipation(@PathVariable Long id) {
        participationService.deleteParticipation(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/take_attendance")
    public ResponseEntity Take_Attendance(
            HttpServletRequest request,
            @RequestParam (required = true)  Long id_formation ,
            @RequestParam(required = true) List<Long> ids_participants,
            @RequestParam(required = true) int nb_heur
    ){
        Formation formation = formationService.getFormationById(id_formation);
        if (formation.getNbHeuresRestantes()<nb_heur){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not enough hours available for this formation");
        }
        formationService.decremnter_nbHeuresRestantes(id_formation,nb_heur);
        participationService.IncrnombreHeures(id_formation,ids_participants,nb_heur);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Formateur take attendance for formation " + formation.getTitre() + " and add " + nb_heur + " hours to participants", LocalDateTime.now(), userLogin));
        return ResponseEntity.ok("Attendance taken successfully");

    }
}
