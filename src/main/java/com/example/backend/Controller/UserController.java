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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

    // Create a new user
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Utilisateur> createUser(
            HttpServletRequest request,
            @RequestPart("user") String userJson,
            @RequestPart(value = "image", required = false) MultipartFile file
    ) throws JsonProcessingException {

            ObjectMapper objectMapper = new ObjectMapper();
            Utilisateur user = objectMapper.readValue(userJson, Utilisateur.class);
            Utilisateur newUser = userService.createUser(user);

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

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(HttpServletRequest request,@PathVariable Long id) {
        userService.deleteUser(id);
        Utilisateur user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        String userlogin = jwtUtils.getUsernameFromRequest(request);
        historiqueService.createHistorique(new Historique("Admin user delete user named :" + user.getLogin(), java.time.LocalDateTime.now(), userlogin));
        return ResponseEntity.noContent().build();
    }
}