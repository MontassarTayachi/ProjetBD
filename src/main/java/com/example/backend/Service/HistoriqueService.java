package com.example.backend.Service;

import com.example.backend.Model.Historique;

import java.util.List;

public interface HistoriqueService {
    List<Historique> getAllHistoriques();
    Historique getHistoriqueById(Long id);
    void createHistorique(Historique historique);
    Historique updateHistorique(Long id, Historique updatedHistorique);
    void deleteHistorique(Long id);

}
