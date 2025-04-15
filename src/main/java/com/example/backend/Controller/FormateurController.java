package com.example.backend.Controller;

import com.example.backend.Model.*;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/formateur")
public class FormateurController {
    private final FormateurService formateurService;
    private  final UserService userService;
    private final  ParticipationService participationService;
    private final FormationService formationService;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private HistoriqueService historiqueService;
    @Autowired
    public FormateurController(FormateurService formateurService,FormationService formationService ,UserService userService, ParticipationService participationService)  {
        this.formateurService = formateurService;
        this.userService = userService;
        this.participationService = participationService;
        this.formationService = formationService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Formateur>> getAllFormateurs() {
        return ResponseEntity.ok(formateurService.getAllFormateurs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formateur> getFormateurById(@PathVariable Long id) {
        return ResponseEntity.ok(formateurService.getFormateurById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<Formateur> createFormateur(
            HttpServletRequest request,
            @RequestBody Formateur formateur,
            @RequestParam(value = "userlogin", required = true) String user_login,
            @RequestParam(value = "userpassword", required = true) String user_password
    ) {
        Utilisateur newuser=new Utilisateur();
        newuser.setLogin(user_login);
        newuser.setPassword(user_password);
        newuser.setRole(new Role(4L,null));
        Utilisateur userInserted = userService.createUser(newuser);
        formateur.setUtilisateur(userInserted);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
       Formateur newFormateur = formateurService.createFormateur(formateur);
        historiqueService.createHistorique(
                new Historique("Ajouté un formateur nommé : " + formateur.getNom(), LocalDateTime.now(), userLogin)
        );
        return new ResponseEntity<>(newFormateur, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formateur> updateFormateur(HttpServletRequest request  ,@PathVariable Long id, @RequestBody Formateur updatedFormateur) {
        Formateur updated = formateurService.updateFormateur(id, updatedFormateur);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("User updates the formateur with ID " + id, LocalDateTime.now(), userLogin));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormateur(HttpServletRequest request,@PathVariable Long id) {
        Formateur existingFormateur = formateurService.getFormateurById(id);
        formateurService.deleteFormateur(id);
       String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Delete the formateur named  " + existingFormateur.getNom(), LocalDateTime.now(), userLogin));
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
        participationService.IncrnombreHeures(ids_participants,nb_heur);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Formateur take attendance for formation " + formation.getTitre() + " and add " + nb_heur + " hours to participants", LocalDateTime.now(), userLogin));
        return ResponseEntity.ok("Attendance taken successfully");

    }

}
