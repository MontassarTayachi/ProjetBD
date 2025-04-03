package com.example.backend.Controller;

import com.example.backend.DTO.LoginRequest;
import com.example.backend.DTO.LoginResponse;
import com.example.backend.Model.Utilisateur;
import com.example.backend.Repository.UtilisateurRepository;
import com.example.backend.Security.JwtUtils;
import com.example.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5174")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UtilisateurRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.getLogin(),loginRequest.getPassword());
            authenticationManager.authenticate(token);
            Utilisateur user = userRepository.findByLogin(loginRequest.getLogin());
            // LoginResponse loginResponse = new LoginResponse(jwtUtils.generate(user), user.getRole().name());

            //return ResponseEntity.ok(jwtUtils.generate(user));
            return ResponseEntity.ok(new LoginResponse(jwtUtils.generate(user), user.getRole().getName()));
        } catch (BadCredentialsException e) {
            // Incorrect password, return specific error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse(null, "Invalid credentials"));
        } catch (AuthenticationException e) {
            // Other authentication failures, return generic error message
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}