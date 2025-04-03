package com.example.backend.Controller;

import com.example.backend.Model.Formateur;
import com.example.backend.Service.EmployeurService;
import com.example.backend.Service.FormateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/formateur")
public class FormateurController {
    private final FormateurService formateurService;

    @Autowired
    public FormateurController(FormateurService formateurService) {
        this.formateurService = formateurService;
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
    public ResponseEntity<Formateur> createFormateur(@RequestBody Formateur formateur) {
        return new ResponseEntity<>(formateurService.createFormateur(formateur), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formateur> updateFormateur(@PathVariable Long id, @RequestBody Formateur updatedFormateur) {
        return ResponseEntity.ok(formateurService.updateFormateur(id, updatedFormateur));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormateur(@PathVariable Long id) {
        formateurService.deleteFormateur(id);
        return ResponseEntity.noContent().build();
    }
}
