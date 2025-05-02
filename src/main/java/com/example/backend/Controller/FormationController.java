package com.example.backend.Controller;

import com.example.backend.Model.Formation;
import com.example.backend.Model.Historique;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.FormationService;
import com.example.backend.Service.HistoriqueService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/formation")
public class FormationController {
    private final FormationService formationService;
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private HistoriqueService historiqueService;
    @Autowired
    public FormationController(FormationService formationService) {
        this.formationService = formationService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Formation>> getAllFormations() {
        return ResponseEntity.ok(formationService.getAllFormations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable Long id) {
        return ResponseEntity.ok(formationService.getFormationById(id));
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Formation> createFormation(
            HttpServletRequest request,
            @RequestPart("formation") String formationJson,
            @RequestPart(value = "image", required = false) MultipartFile file
    ) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        Formation formation = objectMapper.readValue(formationJson, Formation.class);
        Formation newFormation = formationService.createFormation(formation);

        if (file != null && !file.isEmpty()) {
            try {
                // Créer le dossier s'il n'existe pas
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }
                // Renommer l’image avec l’ID de la formation
                String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
                String fileName = newFormation.getId() + extension;
                String fullPath = UPLOAD_DIR + fileName;

                // Sauvegarder le fichier
                file.transferTo(new File(fullPath));

                // Récupérer l'URL de base depuis la requête (ex : http://localhost:8080)
                String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();

                // URL complète de l’image
                String fullImageUrl = baseUrl + "/uploads/" + fileName;

                // Mise à jour de l’image dans la formation
                newFormation.setImageUrl(fullImageUrl);
                newFormation = formationService.updateFormation(newFormation.getId(), newFormation);

            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Ajouté une formation nommée : " + newFormation.getTitre(), LocalDateTime.now(), userLogin)
        );

        return new ResponseEntity<>(newFormation, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Formation> updateFormation(HttpServletRequest request,@PathVariable Long id, @RequestBody Formation updatedFormation) {
        Formation updated = formationService.updateFormation(id, updatedFormation);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("User updates the formation with ID " + id, LocalDateTime.now(), userLogin));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(HttpServletRequest request,@PathVariable Long id) {
        Formation existingFormation  = formationService.getFormationById(id);
        formationService.deleteFormation(id);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Deleted the formation named " + existingFormation.getTitre(), LocalDateTime.now(), userLogin));
        return ResponseEntity.noContent().build();
    }
    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Formation> updateFormation(
            HttpServletRequest request,
            @PathVariable Long id,
            @RequestPart("formation") String formationJson,
            @RequestPart(value = "image", required = false) MultipartFile file
    ) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        Formation formationUpdates = objectMapper.readValue(formationJson, Formation.class);

        Formation existingFormation = formationService.getFormationById(id);

        // Handle image update
        if (file != null && !file.isEmpty()) {
            try {
                // Delete old image if exists
                if (existingFormation.getImageUrl() != null) {
                    String oldFileName = existingFormation.getImageUrl().substring(existingFormation.getImageUrl().lastIndexOf('/') + 1);
                    File oldFile = new File(UPLOAD_DIR + oldFileName);
                    if (oldFile.exists()) {
                        oldFile.delete();
                    }
                }

                // Save new image
                String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
                String fileName = id + extension;
                String fullPath = UPLOAD_DIR + fileName;

                file.transferTo(new File(fullPath));

                String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
                String fullImageUrl = baseUrl + "/uploads/" + fileName;
                formationUpdates.setImageUrl(fullImageUrl);

            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            // Keep existing image if no new file is provided
            formationUpdates.setImageUrl(existingFormation.getImageUrl());
        }

        Formation updatedFormation = formationService.updateFormation(id, formationUpdates);

        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Modifié la formation: " + updatedFormation.getTitre(), LocalDateTime.now(), userLogin)
        );

        return new ResponseEntity<>(updatedFormation, HttpStatus.OK);
    }
}
