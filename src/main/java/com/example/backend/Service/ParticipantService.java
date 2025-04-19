package com.example.backend.Service;

import com.example.backend.Model.Formation;
import com.example.backend.Model.Participant;

import java.util.List;

public interface ParticipantService {
    List<Participant> getAllParticipants();
    Participant getParticipantById(Long id);
    Participant createParticipant(Participant participant);
    Participant updateParticipant(Long id, Participant updatedParticipant);
    void deleteParticipant(Long id);
    Long nb_participants();
}
