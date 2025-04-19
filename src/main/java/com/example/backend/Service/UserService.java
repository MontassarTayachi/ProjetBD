package com.example.backend.Service;

import com.example.backend.Model.Utilisateur;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Utilisateur createUser(Utilisateur user);
    List<Utilisateur> getAllUsers();
    Optional<Utilisateur> getUserById(Long id);
    Utilisateur updateUser(Long id, Utilisateur userDetails);
    void deleteUser(@PathVariable Long id);
    Long nb_users();
}
