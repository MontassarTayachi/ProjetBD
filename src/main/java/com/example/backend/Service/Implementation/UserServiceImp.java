package com.example.backend.Service.Implementation;

import com.example.backend.Model.Utilisateur;
import com.example.backend.Repository.UtilisateurRepository;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    private final UtilisateurRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";


    @Autowired
    public UserServiceImp(UtilisateurRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public Utilisateur createUserr(Utilisateur user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Encrypt password
        return userRepository.save(user);
    }
    // Create a new user
    public Utilisateur createUser(Utilisateur user) {
        if (userRepository.existsByLogin(user.getLogin())) {
            return null; // Return null if user already exists
        }
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
    public void deleteUser(Utilisateur user) {
        if (user.getImage() != null && !user.getImage().isEmpty()) {
            try {
                String imagePath = extractFilePathFromUrl(user.getImage());
                File imageFile = new File(UPLOAD_DIR + imagePath);
                if (imageFile.exists()) {
                    Files.delete(imageFile.toPath());
                }
            } catch (IOException e) {
                // Log the error but don't fail the operation
                System.err.println("Failed to delete user image file: " + e.getMessage());
            }
        }
        userRepository.deleteById(user.getId());
    }
    private String extractFilePathFromUrl(String imageUrl) {
        // Extract just the filename part from the full URL
        return imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    }
    @Override
    public Long nb_users() {
        return userRepository.count();
    }
}
