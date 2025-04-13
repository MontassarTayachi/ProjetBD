package com.example.backend.Service;

import com.example.backend.Model.Participation;

import java.util.List;

public interface ParticipationService {

    Participation createParticipation(Participation participation);
    void deleteParticipation(Long id);
    Participation getParticipationById(Long id);
    List<Participation> getAllParticipations();
    List<Participation> getParticipationsByParticipantId(Long participantId);
    List<Participation> getParticipationsByFormationId(Long formationId);
    List<Participation> getRecentParticipations(int limit);
}
