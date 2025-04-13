package com.example.backend.Controller;

import com.example.backend.Model.Employeur;
import com.example.backend.Model.Historique;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.DomaineService;
import com.example.backend.Service.EmployeurService;
import com.example.backend.Service.HistoriqueService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/employeur")
public class EmployeurController {
    private final EmployeurService employeurService;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private HistoriqueService historiqueService;
    @Autowired
    public EmployeurController(EmployeurService employeurService) {
        this.employeurService = employeurService;
    }



    @GetMapping("/getAll")
    public ResponseEntity<List<Employeur>> getAllEmployeurs() {
        List<Employeur> employeurs = employeurService.getAllEmployeurs();
        return ResponseEntity.ok(employeurs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employeur> getEmployeurById(@PathVariable Long id) {
        Employeur employeur = employeurService.getEmployeurById(id);
        return ResponseEntity.ok(employeur);
    }

    @PostMapping("/add")
    public ResponseEntity<Employeur> createEmployeur(HttpServletRequest request, @RequestBody Employeur employeur) {
        Employeur newEmployeur = employeurService.createEmployeur(employeur);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Ajouté un employeur nommé : " + employeur.getNomemployeur(), LocalDateTime.now(), userLogin)
        );
        return ResponseEntity.status(201).body(newEmployeur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employeur> updateEmployeur(HttpServletRequest request, @PathVariable Long id, @RequestBody Employeur updatedEmployeur) {

        Employeur updated = employeurService.updateEmployeur(id, updatedEmployeur);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("User updates the employer with ID " + id, LocalDateTime.now(), userLogin));
        return ResponseEntity.ok(updated);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeur(HttpServletRequest request, @PathVariable Long id) {
        Employeur existingEmployeur = employeurService.getEmployeurById(id);
        employeurService.deleteEmployeur(id);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Delete the employer with name " + existingEmployeur.getNomemployeur(), LocalDateTime.now(), userLogin));
        return ResponseEntity.ok().build();

    }
}