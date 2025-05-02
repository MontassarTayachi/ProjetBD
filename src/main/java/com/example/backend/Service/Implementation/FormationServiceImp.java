package com.example.backend.Service.Implementation;

import com.example.backend.Model.Domaine;
import com.example.backend.Model.Formateur;
import com.example.backend.Model.Formation;
import com.example.backend.Model.Participation;
import com.example.backend.Repository.DomaineRepository;
import com.example.backend.Repository.FormateurRepository;
import com.example.backend.Repository.FormationRepository;
import com.example.backend.Repository.ParticipationRepository;
import com.example.backend.Service.FormationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FormationServiceImp implements FormationService {
    private final FormationRepository formationRepository;
    private final FormateurRepository formateurRepository;
    private final DomaineRepository domaineRepository;
    private final ParticipationRepository participationRepository;

    @Autowired
    public FormationServiceImp(FormationRepository formationRepository, FormateurRepository formateurRepository,
                               DomaineRepository domaineRepository, ParticipationRepository participationRepository) {
        this.formationRepository = formationRepository;
        this.formateurRepository = formateurRepository;
        this.domaineRepository = domaineRepository;
        this.participationRepository = participationRepository;
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
        if (formation.getTitre() == null || formation.getDomaine() == null || formation.getFormateur() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Titre, domaine, and formateur are required.");
        }

        Formateur formateur = formateurRepository.findById(formation.getFormateur().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formateur not found with ID: " + formation.getFormateur().getId()));

        Domaine domaine = domaineRepository.findById(formation.getDomaine().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Domaine not found with ID: " + formation.getDomaine().getId()));
        formation.setFormateur(formateur);
        formation.setDomaine(domaine);
        if (formation.getAnnée() == null) {
            formation.setAnnée(LocalDateTime.now());
        }
        return formationRepository.save(formation);
    }

    @Override
    public Formation updateFormation(Long id, Formation updatedFormation) {
        Formation existingFormation = getFormationById(id);

        if (updatedFormation.getTitre() != null) existingFormation.setTitre(updatedFormation.getTitre());
        if (updatedFormation.getAnnée() != null) existingFormation.setAnnée(updatedFormation.getAnnée());
        if (updatedFormation.getBudget() != 0) existingFormation.setBudget(updatedFormation.getBudget());
        if (updatedFormation.getNbHeuresRestantes()!= 0) existingFormation.setNbHeuresRestantes(updatedFormation.getNbHeuresRestantes());
        if(updatedFormation.getNbHeuresRestantes()!= 0) existingFormation.setNbHeuresRestantes(updatedFormation.getNbHeuresRestantes());
        if(updatedFormation.getImageUrl()!= null) existingFormation.setImageUrl(updatedFormation.getImageUrl());
        if (updatedFormation.getFormateur() != null) existingFormation.setFormateur(updatedFormation.getFormateur());
        if (updatedFormation.getDomaine() != null) existingFormation.setDomaine(updatedFormation.getDomaine());
        return formationRepository.save(existingFormation);
    }
    @Override
    public void decremnter_nbHeuresRestantes(Long id,int val){
        Formation existingFormation = getFormationById(id);
        existingFormation.setNbHeuresRestantes(existingFormation.getNbHeuresRestantes() - val);
        formationRepository.save(existingFormation);
    }
    @Transactional
    @Override
    public void deleteFormation(Long id) {
        Formation formation = getFormationById(id);

        // Delete participations associated with this formation
        List<Participation> participations = formation.getParticipations();
        if (participations != null && !participations.isEmpty()) {
            participationRepository.deleteAll(participations);
        }

        // Then delete the formation
        formationRepository.delete(formation);
    }
    @Override
    public Long nb_formations() {
        return formationRepository.count();
    }
    @Override
    public List<Object[]> countFormationsByDomaine(){
        return formationRepository.countFormationsByDomaine();
    }

}
