package com.example.backend.Service.Implementation;

import com.example.backend.Model.Formation;
import com.example.backend.Model.Participant;
import com.example.backend.Model.Participation;
import com.example.backend.Repository.FormationRepository;
import com.example.backend.Repository.ParticipantRepository;
import com.example.backend.Repository.ParticipationRepository;
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
    private final ParticipationRepository participationRepository;

    @Autowired
    public ParticipantServiceImp(ParticipantRepository participantRepository,
                                 FormationRepository formationRepository,
                                 ParticipationRepository participationRepository) {
        this.participantRepository = participantRepository;
        this.formationRepository = formationRepository;
        this.participationRepository = participationRepository;
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

        Participant savedParticipant = participantRepository.save(participant);



        return savedParticipant;
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

        // Note: Participations update logic can be handled separately if needed

        return participantRepository.save(participant);
    }

    @Override
    @Transactional
    public void deleteParticipant(Long id) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Participant not found with ID: " + id));

        // Delete participations associated with the participant
        participationRepository.deleteAll(participant.getParticipations());

        // Then delete the participant
        participantRepository.delete(participant);
    }
    @Override
    public Long nb_participants() {
        return participantRepository.count();
    }
}
