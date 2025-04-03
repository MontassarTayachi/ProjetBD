package com.example.backend.Service.Implementation;

import com.example.backend.Model.Participant;
import com.example.backend.Repository.FormateurRepository;
import com.example.backend.Repository.ParticipantRepository;
import com.example.backend.Service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
@Service
public class ParticipantServiceImp implements ParticipantService {
    private final ParticipantRepository participantRepository;

    @Autowired
    public ParticipantServiceImp(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
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
    public void deleteParticipant(Long id) {
        if (!participantRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Participant not found with ID: " + id);
        }
        participantRepository.deleteById(id);
    }
}
