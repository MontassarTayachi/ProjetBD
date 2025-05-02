package com.example.backend.Service;

import com.example.backend.Model.Employeur;

import java.util.List;

public interface EmployeurService {
    List<Employeur> getAllEmployeurs();
    Employeur getEmployeurById(Long id);
    Employeur createEmployeur(Employeur employeur);
    Employeur updateEmployeur(Long id, Employeur updatedEmployeur);
    void deleteEmployeur(Long id);
}
