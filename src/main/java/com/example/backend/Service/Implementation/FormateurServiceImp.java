package com.example.backend.Service.Implementation;

import com.example.backend.Model.Formateur;
import com.example.backend.Repository.EmployeurRepository;
import com.example.backend.Repository.FormateurRepository;
import com.example.backend.Service.FormateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FormateurServiceImp implements FormateurService {
    private final FormateurRepository formateurRepository;

    @Autowired
    public FormateurServiceImp(FormateurRepository formateurRepository) {
        this.formateurRepository = formateurRepository;
    }
    @Override
    public List<Formateur> getAllFormateurs() {
        return formateurRepository.findAll();
    }

    @Override
    public Formateur getFormateurById(Long id) {
        return formateurRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formateur not found with ID: " + id));
    }

    @Override
    public Formateur createFormateur(Formateur formateur) {
        // 🛑 Validate mandatory fields
        if (formateur.getNom() == null || formateur.getPrenom() == null || formateur.getEmail() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Nom, prénom, and email are required.");
        }

        // 🛑 Check if email is already used
        if (formateurRepository.existsByEmail(formateur.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use.");
        }

        return formateurRepository.save(formateur);
    }

    @Override
    public Formateur updateFormateur(Long id, Formateur updatedFormateur) {
        Formateur existingFormateur = getFormateurById(id);

        if (updatedFormateur.getNom() != null) existingFormateur.setNom(updatedFormateur.getNom());
        if (updatedFormateur.getPrenom() != null) existingFormateur.setPrenom(updatedFormateur.getPrenom());
        if (updatedFormateur.getEmail() != null) existingFormateur.setEmail(updatedFormateur.getEmail());
        if (updatedFormateur.getTel() != 0) existingFormateur.setTel(updatedFormateur.getTel());
        if (updatedFormateur.getType() != null) existingFormateur.setType(updatedFormateur.getType());
        if (updatedFormateur.getEmployeur() != null) existingFormateur.setEmployeur(updatedFormateur.getEmployeur());

        return formateurRepository.save(existingFormateur);
    }

    @Override
    public void deleteFormateur(Long id) {
        Formateur formateur = getFormateurById(id);

        // 🛑 Prevent deletion if the formateur has formations
        if (!formateur.getFormations().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Cannot delete formateur with active formations.");
        }

        formateurRepository.deleteById(id);
    }
}
