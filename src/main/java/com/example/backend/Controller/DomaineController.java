package com.example.backend.Controller;

import com.example.backend.Model.Domaine;
import com.example.backend.Model.Historique;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.DomaineService;
import com.example.backend.Service.HistoriqueService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/domaine")
public class DomaineController {
    private final DomaineService domaineService;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    public DomaineController(DomaineService domaineService) {
        this.domaineService = domaineService;
    }
    @Autowired
    private HistoriqueService historiqueService;
    @GetMapping("/getAll")
    public ResponseEntity<List<Domaine>> getAllDomaines() {
        List<Domaine> domaines = domaineService.getAllDomaines();
        return ResponseEntity.ok(domaines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Domaine> getDomaineById(@PathVariable Long id) {
        Domaine domaine = domaineService.getDomaineById(id);
        return ResponseEntity.ok(domaine);
    }

    @PostMapping
    public ResponseEntity<Domaine> createDomaine(HttpServletRequest request, @RequestBody Domaine domaine) {
        Domaine newDomaine = domaineService.createDomaine(domaine);
        // prendre le token de la requete
        String userLogin = jwtUtils.getUsernameFromRequest(request);
       historiqueService.createHistorique(new Historique("User creates a new domain named "+domaine.getLibelle(), LocalDateTime.now(), userLogin));
        return ResponseEntity.status(201).body(newDomaine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Domaine> updateDomaine(HttpServletRequest request,@PathVariable Long id, @RequestBody Domaine updatedDomaine) {
        Domaine updated = domaineService.updateDomaine(id, updatedDomaine);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("User updates the domain with ID " + id, LocalDateTime.now(), userLogin));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDomaine(HttpServletRequest request,@PathVariable Long id) {
        Domaine existingDomaine = domaineService.getDomaineById(id);
        domaineService.deleteDomaine(id);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Delete the domain named " + existingDomaine.getLibelle(), LocalDateTime.now(), userLogin));
        return ResponseEntity.noContent().build();
    }
}
