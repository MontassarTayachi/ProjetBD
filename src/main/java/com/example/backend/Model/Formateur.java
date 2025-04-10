package com.example.backend.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @OneToMany(mappedBy = "formateur",cascade = CascadeType.ALL)
    @JsonBackReference  // This will be serialized normally
    private List<Formation> formations ;
}
