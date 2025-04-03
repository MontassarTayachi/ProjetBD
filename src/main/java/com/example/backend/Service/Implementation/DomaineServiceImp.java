package com.example.backend.Service.Implementation;

import com.example.backend.Model.Domaine;
import com.example.backend.Model.Employeur;
import com.example.backend.Repository.DomaineRepository;
import com.example.backend.Service.DomaineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class DomaineServiceImp implements DomaineService {
    private final DomaineRepository domaineRepository;

    public DomaineServiceImp(DomaineRepository domaineRepository) {
        this.domaineRepository = domaineRepository;
    }

    public List<Domaine> getAllDomaines() {
        return domaineRepository.findAll();
    }

    public Domaine getDomaineById(Long id) {
        return domaineRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Domaine not found with ID: " + id));
    }

    public Domaine createDomaine(Domaine domaine) {
        Optional<Domaine> existingDomaine = domaineRepository.findByLibelle(domaine.getLibelle());
        if (existingDomaine.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Domaine with the same libelle already exists");
        }
        return domaineRepository.save(domaine);
    }

    public Domaine updateDomaine(Long id, Domaine updatedDomaine) {
        Domaine domaine = getDomaineById(id);
        domaine.setLibelle(updatedDomaine.getLibelle());
        return domaineRepository.save(domaine);
    }

    public void deleteDomaine(Long id) {
        if (!domaineRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Domaine not found with ID: " + id);
        }
        domaineRepository.deleteById(id);
    }

}
