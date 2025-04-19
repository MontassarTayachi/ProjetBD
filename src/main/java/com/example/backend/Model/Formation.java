package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
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
    private LocalDateTime année;
    private double budget;
    private int nbHeures;
    private  int nbHeuresRestantes;
    @ManyToOne
    @JoinColumn(name = "idDomaine")
    private Domaine domaine;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idFormateur", nullable = false)
    private Formateur formateur;
    @Column(length = 512)
    private String imageUrl;

    @OneToMany(mappedBy = "formation", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("formation")
    private List<Participation> participations;
}
