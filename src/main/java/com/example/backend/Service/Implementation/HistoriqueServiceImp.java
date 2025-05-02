package com.example.backend.Service.Implementation;

import com.example.backend.Model.Historique;
import com.example.backend.Repository.HistoriqueRepository;
import com.example.backend.Service.HistoriqueService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoriqueServiceImp implements HistoriqueService {

    private final HistoriqueRepository historiqueRepository;
     HistoriqueServiceImp(HistoriqueRepository historiqueRepository) {
        this.historiqueRepository = historiqueRepository;
     }
    @Override
    public List<Historique> getAllHistoriques() {
        return historiqueRepository.findAllHistorique();
    }
    @Override
    public Historique getHistoriqueById(Long id) {
        return historiqueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Historique not found with ID: " + id));
    }
    @Override
    public void createHistorique(Historique historique) {
         historiqueRepository.save(historique);
    }
    @Override
    public Historique updateHistorique(Long id, Historique historique) {
        Historique existingHistorique = getHistoriqueById(id);
        existingHistorique.setDate(historique.getDate());
        existingHistorique.setAction(historique.getAction());
        return historiqueRepository.save(existingHistorique);
    }
    @Override
    public void deleteHistorique(Long id) {
        Historique historique = getHistoriqueById(id);
        historiqueRepository.delete(historique);
    }

}
