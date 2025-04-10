package com.example.backend.Service.Implementation;

import com.example.backend.Model.Formation;
import com.example.backend.Model.Participant;
import com.example.backend.Repository.FormateurRepository;
import com.example.backend.Repository.FormationRepository;
import com.example.backend.Repository.ParticipantRepository;
import com.example.backend.Service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class ParticipantServiceImp implements ParticipantService {
    private final ParticipantRepository participantRepository;
    private final FormationRepository formationRepository;

    @Autowired
    public ParticipantServiceImp(ParticipantRepository participantRepository , FormationRepository formationRepository) {
        this.participantRepository = participantRepository;
        this.formationRepository =formationRepository;
    }
    @Override
    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    @Override
    public Participant getParticipantById(Long id) {
        return participantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Participant not found with ID: " + id));
    }

    @Override
    public Participant createParticipant(Participant participant) {
        Optional<Participant> existingParticipant = participantRepository.findByEmail(participant.getEmail());
        if (existingParticipant.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Participant with the same email already exists");
        }

        List<Formation> attachedFormations = new ArrayList<>();
        if (participant.getFormations() != null) {
            for (Formation f : participant.getFormations()) {
                Formation managedFormation = formationRepository.findById(f.getId())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation not found with id " + f.getId()));

                // Link both sides of the relationship
                managedFormation.getParticipants().add(participant);
                attachedFormations.add(managedFormation);
            }
        }

        participant.setFormations(attachedFormations);

        return participantRepository.save(participant);
    }

    @Override
    public Participant updateParticipant(Long id, Participant updatedParticipant) {
        Participant participant = getParticipantById(id);
        participant.setNom(updatedParticipant.getNom());
        participant.setPrenom(updatedParticipant.getPrenom());
        participant.setEmail(updatedParticipant.getEmail());
        participant.setTel(updatedParticipant.getTel());
        participant.setStructure(updatedParticipant.getStructure());
        participant.setProfil(updatedParticipant.getProfil());
        participant.setFormations(updatedParticipant.getFormations());
        return participantRepository.save(participant);
    }

    @Override
    @Transactional
    public void deleteParticipant(Long id) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Participant not found with ID: " + id));


        // Remove this participant from each formation's list
        for (Formation formation : participant.getFormations()) {
            formation.getParticipants().remove(participant);
        }

        // Clear formations from participant (break association)
        participant.getFormations().clear();

        // Delete only the participant
        participantRepository.delete(participant);    }
}
