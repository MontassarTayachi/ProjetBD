package com.example.backend.Service;

import com.example.backend.Model.Domaine;

import java.util.List;

public interface DomaineService {
    List<Domaine> getAllDomaines();
    Domaine getDomaineById(Long id);
    Domaine createDomaine(Domaine domaine);
    Domaine updateDomaine(Long id, Domaine domaine);
    void deleteDomaine(Long id);
}
