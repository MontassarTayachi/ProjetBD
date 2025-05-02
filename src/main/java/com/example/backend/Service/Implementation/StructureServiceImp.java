package com.example.backend.Service.Implementation;

import com.example.backend.Model.Structure;
import com.example.backend.Repository.StructureRepository;
import com.example.backend.Service.StructureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class StructureServiceImp implements StructureService {
    private final StructureRepository structureRepository;

    @Autowired
    public StructureServiceImp(StructureRepository structureRepository) {
        this.structureRepository = structureRepository;
    }

    @Override
    public List<Structure> getAllStructures() {
        return structureRepository.findAll();
    }

    @Override
    public Structure getStructureById(Long id) {
        return structureRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Structure not found with ID: " + id));
    }

    @Override
    public Structure createStructure(Structure structure) {
        // Check if a structure with the same libelle already exists
        Optional<Structure> existingStructure = structureRepository.findByLibelle(structure.getLibelle());
        if (existingStructure.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Structure with the same name already exists");
        }
        return structureRepository.save(structure);
    }

    @Override
    public Structure updateStructure(Long id, Structure updatedStructure) {
        Structure structure = getStructureById(id); // Ensures it exists
        structure.setLibelle(updatedStructure.getLibelle());
        return structureRepository.save(structure);
    }

    @Override
    public void deleteStructure(Long id) {
        if (!structureRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Structure not found with ID: " + id);
        }
        structureRepository.deleteById(id);
    }
}