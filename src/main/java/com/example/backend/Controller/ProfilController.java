package com.example.backend.Controller;

import com.example.backend.Model.Historique;
import com.example.backend.Model.Profil;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.HistoriqueService;
import com.example.backend.Service.ProfilService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/profil")
public class ProfilController {
    private final ProfilService profilService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private HistoriqueService historiqueService;
    @Autowired
    public ProfilController(ProfilService profilService) {
        this.profilService = profilService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Profil>> getAllProfils() {
        List<Profil> profils = profilService.getAllProfils();
        return ResponseEntity.ok(profils);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profil> getProfilById(@PathVariable Long id) {
        Profil profil = profilService.getProfilById(id);
        return ResponseEntity.ok(profil);
    }

    @PostMapping
    public ResponseEntity<Profil> createProfil(HttpServletRequest request, @RequestBody Profil profil) {
        Profil newProfil = profilService.createProfil(profil);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Ajouté un profil nommé : " + profil.getLibelle(), java.time.LocalDateTime.now(), userLogin)
        );
        return ResponseEntity.status(201).body(newProfil);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profil> updateProfil(HttpServletRequest request,@PathVariable Long id, @RequestBody Profil updatedProfil) {
        Profil existingProfil = profilService.getProfilById(id);
        Profil updated = profilService.updateProfil(id, updatedProfil);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("updated the profil named : " + existingProfil.getLibelle() + " to " + updated.getLibelle(), java.time.LocalDateTime.now(), userLogin));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfil(HttpServletRequest request,@PathVariable Long id) {
        Profil existingProfil = profilService.getProfilById(id);
        profilService.deleteProfil(id);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("deleted the profil named : " + existingProfil.getLibelle(), java.time.LocalDateTime.now(), userLogin));
         return ResponseEntity.noContent().build();
    }
}
