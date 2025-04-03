package com.example.backend.Controller;

import com.example.backend.Model.Domaine;
import com.example.backend.Service.DomaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/domaine")
public class DomaineController {
    private final DomaineService domaineService;

    @Autowired
    public DomaineController(DomaineService domaineService) {
        this.domaineService = domaineService;
    }

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
    public ResponseEntity<Domaine> createDomaine(@RequestBody Domaine domaine) {
        Domaine newDomaine = domaineService.createDomaine(domaine);
        return ResponseEntity.status(201).body(newDomaine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Domaine> updateDomaine(@PathVariable Long id, @RequestBody Domaine updatedDomaine) {
        Domaine updated = domaineService.updateDomaine(id, updatedDomaine);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDomaine(@PathVariable Long id) {
        domaineService.deleteDomaine(id);
        return ResponseEntity.noContent().build();
    }
}
