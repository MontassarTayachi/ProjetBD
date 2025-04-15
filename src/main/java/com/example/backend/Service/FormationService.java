package com.example.backend.Service;

import com.example.backend.Model.Formation;

import java.util.List;

public interface FormationService {
    List<Formation> getAllFormations();
    Formation getFormationById(Long id);
    Formation createFormation(Formation formation);
    Formation updateFormation(Long id, Formation updatedFormation);
    void deleteFormation(Long id);
    void decremnter_nbHeuresRestantes(Long id,int val);
}
