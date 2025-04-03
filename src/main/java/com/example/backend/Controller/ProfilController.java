package com.example.backend.Controller;

import com.example.backend.Model.Profil;
import com.example.backend.Service.ProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/profil")
public class ProfilController {
    private final ProfilService profilService;

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
    public ResponseEntity<Profil> createProfil(@RequestBody Profil profil) {
        Profil newProfil = profilService.createProfil(profil);
        return ResponseEntity.status(201).body(newProfil);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profil> updateProfil(@PathVariable Long id, @RequestBody Profil updatedProfil) {
        Profil updated = profilService.updateProfil(id, updatedProfil);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfil(@PathVariable Long id) {
        profilService.deleteProfil(id);
        return ResponseEntity.noContent().build();
    }
}
