package com.example.backend.Security;

import com.example.backend.Model.Utilisateur;
import com.example.backend.Repository.UtilisateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomDetailService implements UserDetailsService {
    @Autowired
    UtilisateurRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Utilisateur userOptional = userRepository.findByLogin(login);

        if (userOptional != null){
            UserDetailsAdapter user=new UserDetailsAdapter(userOptional);
            return new org.springframework.security.core.userdetails.User(login,user.getPassword(),user.getAuthorities());
        }
        return null;
    }
}
