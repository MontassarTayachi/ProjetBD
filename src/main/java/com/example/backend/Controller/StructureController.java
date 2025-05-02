package com.example.backend.Controller;

import com.example.backend.Model.Historique;
import com.example.backend.Model.Structure;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.HistoriqueService;
import com.example.backend.Service.StructureService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/structure")
public class StructureController {
    private final StructureService structureService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private HistoriqueService historiqueService;
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
    public ResponseEntity<?> createStructure(HttpServletRequest request, @RequestBody Structure structure) {
        Structure newStructure = structureService.createStructure(structure);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Ajouté une structure nommée : " + structure.getLibelle(), java.time.LocalDateTime.now(), userLogin)
        );
        return ResponseEntity.status(201).body(newStructure);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Structure> updateStructure(HttpServletRequest request,@PathVariable Long id, @RequestBody Structure updatedStructure) {
        Structure existingStructure = structureService.getStructureById(id);
        Structure updated = structureService.updateStructure(id, updatedStructure);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Update Structure named : " + existingStructure.getLibelle(), java.time.LocalDateTime.now(), userLogin));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStructure(HttpServletRequest request,@PathVariable Long id) {
       Structure existingStructure = structureService.getStructureById(id);
        structureService.deleteStructure(id);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Deleted Structure named : " + existingStructure.getLibelle(), java.time.LocalDateTime.now(), userLogin));
        return ResponseEntity.noContent().build();
    }
}