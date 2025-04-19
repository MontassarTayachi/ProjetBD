package com.example.backend.Service.Implementation;

import com.example.backend.Model.Utilisateur;
import com.example.backend.Repository.UtilisateurRepository;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    private final UtilisateurRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImp(UtilisateurRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Create a new user
    public Utilisateur createUser(Utilisateur user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        return userRepository.save(user);
    }

    // Get all users
    public List<Utilisateur> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<Utilisateur> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update user
    public Utilisateur updateUser(Long id, Utilisateur userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setLogin(userDetails.getLogin());
            user.setRole(userDetails.getRole());
            if (!userDetails.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword())); // Encrypt updated password
            }
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Long nb_users() {
        return userRepository.count();
    }
}
