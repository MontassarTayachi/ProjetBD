package com.example.backend.Controller;

import com.example.backend.Model.Employeur;
import com.example.backend.Service.EmployeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/employeur")
public class EmployeurController {
    private final EmployeurService employeurService;

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
    public ResponseEntity<Employeur> createEmployeur(@RequestBody Employeur employeur) {
        Employeur newEmployeur = employeurService.createEmployeur(employeur);
        return ResponseEntity.status(201).body(newEmployeur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employeur> updateEmployeur(@PathVariable Long id, @RequestBody Employeur updatedEmployeur) {
        Employeur updated = employeurService.updateEmployeur(id, updatedEmployeur);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployeur(@PathVariable Long id) {
        employeurService.deleteEmployeur(id);
        return ResponseEntity.noContent().build();
    }
}
