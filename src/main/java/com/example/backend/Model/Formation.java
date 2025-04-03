package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private int année;
    private int durée;
    private double budget;
    @ManyToOne
    @JoinColumn(name = "idDomaine")
    private Domaine domaine;

    @ManyToMany(mappedBy = "formations")
    private Set<Participant> participants;

    @ManyToOne
    @JoinColumn(name = "idFormateur")
    @JsonBackReference
    private Formateur formateur;
}
