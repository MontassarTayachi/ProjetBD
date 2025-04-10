package com.example.backend.Service.Implementation;

import com.example.backend.Model.Employeur;
import com.example.backend.Repository.EmployeurRepository;
import com.example.backend.Service.EmployeurService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeurServiceImp implements EmployeurService {

    private final EmployeurRepository employeurRepository;

    @Autowired
    public EmployeurServiceImp(EmployeurRepository employeurRepository) {
        this.employeurRepository = employeurRepository;
    }

    @Override
    public List<Employeur> getAllEmployeurs() {
        return employeurRepository.findAll();
    }

    @Override
    public Employeur getEmployeurById(Long id) {
        return employeurRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employeur not found with ID: " + id));
    }

    @Override
    public Employeur createEmployeur(Employeur employeur) {
        // Check if an employeur with the same name already exists
        Optional<Employeur> existingEmployeur = employeurRepository.findByNomemployeur(employeur.getNomemployeur());
        if (existingEmployeur.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Employeur with the same name already exists");
        }
        return employeurRepository.save(employeur);
    }

    @Override
    public Employeur updateEmployeur(Long id, Employeur updatedEmployeur) {
        Employeur employeur = getEmployeurById(id);
        employeur.setNomemployeur(updatedEmployeur.getNomemployeur());
        return employeurRepository.save(employeur);
    }

    @Override
    @Transactional
    public void deleteEmployeur(Long id) {
        if (!employeurRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Employeur not found with ID: " + id);
        }
        employeurRepository.deleteById(id);
    }
}
