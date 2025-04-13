package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "participant_id")
    @JsonIgnoreProperties({"formations", "structure", "profil", "participations"}) // ou "participations" si tu ajoutes cette relation
    private Participant participant;

    @ManyToOne
    @JoinColumn(name = "formation_id")
    @JsonIgnoreProperties({"participants", "domaine", "formateur", "participations"})
    private Formation formation;
    private LocalDateTime date_inscription;
    private int nombreHeures;
}
