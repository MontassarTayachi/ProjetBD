package com.example.backend.Controller;

import com.example.backend.Model.Structure;
import com.example.backend.Service.StructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/structure")
public class StructureController {
    private final StructureService structureService;

    @Autowired
    public StructureController(StructureService structureService) {
        this.structureService = structureService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Structure>> getAllStructures() {
        List<Structure> structures = structureService.getAllStructures();
        return ResponseEntity.ok(structures);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Structure> getStructureById(@PathVariable Long id) {
        Structure structure = structureService.getStructureById(id);
        return ResponseEntity.ok(structure);
    }

    @PostMapping("/add")
    public ResponseEntity<Structure> createStructure(@RequestBody Structure structure) {
        Structure newStructure = structureService.createStructure(structure);
        return ResponseEntity.status(201).body(newStructure);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Structure> updateStructure(@PathVariable Long id, @RequestBody Structure updatedStructure) {
        Structure updated = structureService.updateStructure(id, updatedStructure);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStructure(@PathVariable Long id) {
        structureService.deleteStructure(id);
        return ResponseEntity.noContent().build();
    }
}