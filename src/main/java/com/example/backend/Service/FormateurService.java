package com.example.backend.Service;

import com.example.backend.Model.Formateur;

import java.util.List;

public interface FormateurService {
    List<Formateur> getAllFormateurs();
    Formateur getFormateurById(Long id);
    Formateur createFormateur(Formateur formateur);
    Formateur updateFormateur(Long id, Formateur updatedFormateur);
    void deleteFormateur(Long id);
    Long nb_formateurs();
}
