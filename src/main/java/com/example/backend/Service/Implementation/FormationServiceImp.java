package com.example.backend.Service.Implementation;

import com.example.backend.Model.Domaine;
import com.example.backend.Model.Formateur;
import com.example.backend.Model.Formation;
import com.example.backend.Repository.DomaineRepository;
import com.example.backend.Repository.FormateurRepository;
import com.example.backend.Repository.FormationRepository;
import com.example.backend.Service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@Service
public class FormationServiceImp implements FormationService {
    private final FormationRepository formationRepository;
    private final FormateurRepository formateurRepository;
    private final DomaineRepository domaineRepository;

    @Autowired
    public FormationServiceImp(FormationRepository formationRepository, FormateurRepository formateurRepository, DomaineRepository domaineRepository) {
        this.formationRepository = formationRepository;
        this.formateurRepository = formateurRepository;
        this.domaineRepository = domaineRepository;
    }

    @Override
    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    @Override
    public Formation getFormationById(Long id) {
        return formationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation not found with ID: " + id));
    }

    @Override
    public Formation createFormation(Formation formation) {
        // 🛑 Validate required fields
        if (formation.getTitre() == null || formation.getDomaine() == null || formation.getFormateur() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Titre, domaine, and formateur are required.");
        }

        // 🛑 Check if the formateur exists
        Formateur formateur = formateurRepository.findById(formation.getFormateur().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formateur not found with ID: " + formation.getFormateur().getId()));

        // 🛑 Check if the domaine exists
        Domaine domaine = domaineRepository.findById(formation.getDomaine().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Domaine not found with ID: " + formation.getDomaine().getId()));

        formation.setFormateur(formateur);
        formation.setDomaine(domaine);

        return formationRepository.save(formation);
    }

    @Override
    public Formation updateFormation(Long id, Formation updatedFormation) {
        Formation existingFormation = getFormationById(id);

        if (updatedFormation.getTitre() != null) existingFormation.setTitre(updatedFormation.getTitre());
        if (updatedFormation.getAnnée() != 0) existingFormation.setAnnée(updatedFormation.getAnnée());
        if (updatedFormation.getDurée() != 0) existingFormation.setDurée(updatedFormation.getDurée());
        if (updatedFormation.getBudget() != 0) existingFormation.setBudget(updatedFormation.getBudget());

        return formationRepository.save(existingFormation);
    }

    @Override
    public void deleteFormation(Long id) {
        Formation formation = getFormationById(id);
        formationRepository.deleteById(id);
    }
}
