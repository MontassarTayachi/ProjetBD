package com.example.backend.Controller;

import com.example.backend.Service.HistoriqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/Historique")


public class HistoriqueController {
    private final HistoriqueService historiqueService;
    @Autowired
    public HistoriqueController(HistoriqueService historiqueService) {
        this.historiqueService = historiqueService;
    }
    @GetMapping()
    public ResponseEntity getHistorique() {
        return ResponseEntity.ok(historiqueService.getAllHistoriques());
    }


}
