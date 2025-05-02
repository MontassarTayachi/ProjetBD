package com.example.backend.Service;

import com.example.backend.Model.Profil;

import java.util.List;

public interface ProfilService {
    List<Profil> getAllProfils();
    Profil getProfilById(Long id);
    Profil createProfil(Profil profil);
    Profil updateProfil(Long id, Profil updatedProfil);
    void deleteProfil(Long id);
}
