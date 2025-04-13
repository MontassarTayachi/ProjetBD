package com.example.backend.Service.Implementation;

import com.example.backend.Model.Participant;
import com.example.backend.Model.Participation;
import com.example.backend.Repository.FormationRepository;
import com.example.backend.Repository.ParticipantRepository;
import com.example.backend.Repository.ParticipationRepository;
import com.example.backend.Service.ParticipationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ParticipationServiceImp implements ParticipationService {

    private final ParticipationRepository participationRepository;
    @Autowired
    public ParticipationServiceImp(ParticipationRepository participationRepository)  {
        this.participationRepository = participationRepository;
    }

    @Override
    public Participation createParticipation(Participation participation) {
        return participationRepository.save(participation);
    }


    @Override
    public void deleteParticipation(Long id) {
        participationRepository.deleteById(id);
    }
    @Override
    public Participation getParticipationById(Long id) {
       return participationRepository.findById(id).orElse(null);
        }
    @Override
    public List<Participation> getAllParticipations() {
        return participationRepository.findAll();
    }
    @Override
    public List<Participation> getParticipationsByParticipantId(Long participantId) {
        return participationRepository.findByParticipantId(participantId);
    }
    @Override
    public List<Participation> getParticipationsByFormationId(Long formationId) {
        return participationRepository.findByFormationId(formationId);
    }
    @Override
    public List<Participation> getRecentParticipations(int limit) {
        return participationRepository.findRecentParticipations(limit);
    }


}