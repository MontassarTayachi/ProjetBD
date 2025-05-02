package com.example.backend.Controller;

import com.example.backend.Model.Historique;
import com.example.backend.Model.Participant;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.HistoriqueService;
import com.example.backend.Service.ParticipantService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/participant")
public class ParticipantController {
    private final ParticipantService participantService ;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private HistoriqueService historiqueService;
    @Autowired
    public ParticipantController (ParticipantService participantService){this.participantService=participantService;}
    @GetMapping("/getAll")
    public ResponseEntity getAllParticipants() {
        try {
            List<Participant> list = participantService.getAllParticipants();
            return ResponseEntity.ok(list);
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Participant> getParticipantById(@PathVariable Long id) {
        return ResponseEntity.ok(participantService.getParticipantById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<Participant> createParticipant(HttpServletRequest request, @RequestBody Participant participant) {
        Participant newParticipant = participantService.createParticipant(participant);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Ajouté un participant nommé : " + participant.getNom(), java.time.LocalDateTime.now(), userLogin)
        );
        return ResponseEntity.ok(newParticipant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Participant> updateParticipant(HttpServletRequest request,@PathVariable Long id, @RequestBody Participant updatedParticipant) {
        Participant existingParticipant = participantService.getParticipantById(id);
        Participant updated = participantService.updateParticipant(id, updatedParticipant);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Updated the Participant named " + existingParticipant.getNom(), java.time.LocalDateTime.now(), userLogin)
        );
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParticipant(HttpServletRequest request,@PathVariable Long id) {
        Participant existingParticipant = participantService.getParticipantById(id);
        participantService.deleteParticipant(id);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(       
                new Historique("Deleted the participant named " + existingParticipant.getNom(), java.time.LocalDateTime.now(), userLogin)
        );
        return ResponseEntity.noContent().build();
    }
}