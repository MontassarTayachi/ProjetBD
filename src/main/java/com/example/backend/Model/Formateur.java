package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Formateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String prenom;
    private String email;
    private int tel;
    private String type;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idEmployeur")
    private Employeur employeur;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idUser")
    private Utilisateur utilisateur;  // Corrigé ici : liaison avec l'entité Utilisateur

    @OneToMany(mappedBy = "formateur", cascade = CascadeType.ALL)
    @JsonBackReference  // Corrigé : ici on empêche la récursion infinie
    private List<Formation> formations;
}
