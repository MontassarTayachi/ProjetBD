package com.example.backend.Service.Implementation;

import com.example.backend.Model.Profil;
import com.example.backend.Repository.ProfilRepository;
import com.example.backend.Service.ProfilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProfilServiceImp implements ProfilService {

    private final ProfilRepository profilRepository;

    @Autowired
    public ProfilServiceImp(ProfilRepository profilRepository) {
        this.profilRepository = profilRepository;
    }

    @Override
    public List<Profil> getAllProfils() {
        return profilRepository.findAll();
    }

    @Override
    public Profil getProfilById(Long id) {
        return profilRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profil not found with ID: " + id));
    }

    @Override
    public Profil createProfil(Profil profil) {
        // Check if a profil with the same libelle already exists
        Optional<Profil> existingProfil = profilRepository.findByLibelle(profil.getLibelle());
        if (existingProfil.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Profil with the same name already exists");
        }
        return profilRepository.save(profil);
    }

    @Override
    public Profil updateProfil(Long id, Profil updatedProfil) {
        Profil profil = getProfilById(id); // Ensures it exists
        profil.setLibelle(updatedProfil.getLibelle());
        return profilRepository.save(profil);
    }

    @Override
    public void deleteProfil(Long id) {
        if (!profilRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Profil not found with ID: " + id);
        }
        profilRepository.deleteById(id);
    }
}
