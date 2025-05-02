package com.example.backend.Controller;

import com.example.backend.Model.Historique;
import com.example.backend.Model.Role;
import com.example.backend.Model.Utilisateur;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.HistoriqueService;
import com.example.backend.Service.RoleService;
import com.example.backend.Service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {
    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";

    private final UserService userService;
    private final RoleService roleService;
    private JwtUtils jwtUtils;
    private HistoriqueService  historiqueService;

    @Autowired
    public UserController(UserService userService,RoleService roleService, JwtUtils jwtUtils, HistoriqueService historiqueService) {
        this.userService = userService;
        this.roleService=roleService;
        this.jwtUtils = jwtUtils;
        this.historiqueService = historiqueService;

    }
    @PostMapping("/addUser")
    public ResponseEntity<Utilisateur> createUser(HttpServletRequest request, @RequestBody Utilisateur user) {

        Utilisateur newUser = userService.createUser(user);

        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Add a named user : " + user.getLogin(),LocalDateTime.now(), userLogin)
        );
        return ResponseEntity.ok(newUser);
    }

    // Create a new user
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createUser(
            HttpServletRequest request,
            @RequestPart("user") String userJson,
            @RequestPart(value = "image", required = false) MultipartFile file
    ) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        Utilisateur user = objectMapper.readValue(userJson, Utilisateur.class);
        System.out.println("Deserialized JSON: " + userJson);
        System.out.println("Parsed User object: " + user);
        System.out.println("Password before encoding: " + user.getPassword());

        System.out.println("Raw password from JSON: " + user.getPassword());
        Utilisateur newUser = userService.createUser(user);
        if (newUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login '" + user.getLogin() + "' is already taken") ;
        }
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Add a named user : " + user.getLogin(),LocalDateTime.now(), userLogin)
        );
        if (file != null && !file.isEmpty()) {
            try {
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }
                String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
                String fileName = "user"+newUser.getId() + extension;
                String fullPath = UPLOAD_DIR + fileName;
                file.transferTo(new File(fullPath));
                String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
                String fullImageUrl = baseUrl + "/uploads/" + fileName;
                newUser.setImage(fullImageUrl);
                userService.updateUser(newUser.getId(), newUser);
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
        }
        return ResponseEntity.ok(newUser);
    }

    @PostMapping("/addRole")
    public ResponseEntity<Role> createRole(HttpServletRequest request,@RequestBody Role role) {
        Role newRole = roleService.createRole(role);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("User add Role named"+role.getName(), LocalDateTime.now(),userLogin));
        return ResponseEntity.ok(newRole);
    }
    @GetMapping("/allRole")
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }
    // Get all users
    @GetMapping
    public ResponseEntity<List<Utilisateur>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable Long id) {
        Optional<Utilisateur> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update user
    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUser(HttpServletRequest request,@PathVariable Long id, @RequestBody Utilisateur userDetails) {
        Utilisateur existingUser = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        Utilisateur updatedUser = userService.updateUser(id, userDetails);
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Admin User update user named : " + existingUser.getLogin(), LocalDateTime.now(), userLogin));
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        // Log the update action
        return ResponseEntity.ok(updatedUser);
    }

    //----------update new version -------------
    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUserWithImage(
            HttpServletRequest request,
            @PathVariable Long id,
            @RequestPart("user") String userJson,
            @RequestPart(value = "image", required = false) MultipartFile file
    ) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Utilisateur updatedData = objectMapper.readValue(userJson, Utilisateur.class);

        Utilisateur existingUser = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // Update login
        existingUser.setLogin(updatedData.getLogin());

        // Update password if present
        if (updatedData.getPassword() != null && !updatedData.getPassword().trim().isEmpty()) {
            existingUser.setPassword(updatedData.getPassword());
        }

        // Update role
        existingUser.setRole(updatedData.getRole());

        // Handle image update
        if (file != null && !file.isEmpty()) {
            try {
                File uploadDir = new File(UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.'));
                String fileName = "user" + existingUser.getId() + extension;
                String fullPath = UPLOAD_DIR + fileName;

                file.transferTo(new File(fullPath));

                String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
                String imageUrl = baseUrl + "/uploads/" + fileName;
                existingUser.setImage(imageUrl);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
            }
        }

        Utilisateur savedUser = userService.updateUser(id, existingUser);

        String userLogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(
                new Historique("Admin updated user " + savedUser.getLogin(), LocalDateTime.now(), userLogin)
        );

        return ResponseEntity.ok(savedUser);
    }


    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(HttpServletRequest request, @PathVariable Long id) {
        // First get the user (before deletion)
        Utilisateur user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // Store information needed for history before deletion
        String userLogin = jwtUtils.getUsernameFromRequest(request);
        String deletedUserLogin = user.getLogin();

        // Delete the user (and associated image)
        userService.deleteUser(user);  // Modified to accept the full user object

        // Create history
        historiqueService.createHistorique(
                new Historique("Admin user delete user named: " + deletedUserLogin,
                        LocalDateTime.now(),
                        userLogin)
        );

        return ResponseEntity.noContent().build();
    }
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) return ResponseEntity.notFound().build();

        Path path = file.toPath();
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG) // or detect dynamically
                .body(resource);
    }

}