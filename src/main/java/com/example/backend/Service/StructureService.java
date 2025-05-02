package com.example.backend.Service;

import com.example.backend.Model.Structure;

import java.util.List;

public interface StructureService {
    List<Structure> getAllStructures();
    Structure getStructureById(Long id);
    Structure createStructure(Structure structure);
    Structure updateStructure(Long id, Structure updatedStructure);
    void deleteStructure(Long id);
}
