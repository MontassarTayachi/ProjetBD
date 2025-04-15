package com.example.backend.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig  {
    private final JwtSecurityFilter jwtSecurityFilter;
    @Autowired
    CustomDetailService customDetailService;

    public SecurityConfig(JwtSecurityFilter jwtSecurityFilter) {
        this.jwtSecurityFilter = jwtSecurityFilter;
    }

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource(corsConfigurationSource()) // Add this line
                .and()
                .csrf().disable()
                .authorizeRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/user/**").permitAll()
                .requestMatchers("/api/domaine/**").permitAll()
                .requestMatchers("/api/profil/**").permitAll()
                .requestMatchers("/api/employeur/**").permitAll()
                .requestMatchers("/api/structure/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/api/formateur/**").permitAll()
                .requestMatchers("/api/formation/**").permitAll()
                .requestMatchers("/api/participant/**").permitAll()
                .requestMatchers("/api/participations/**").permitAll()
                .requestMatchers("/api/Historique").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtSecurityFilter, UsernamePasswordAuthenticationFilter.class )
                .authenticationProvider(daoAuthenticationProvider())




        ;
        return http.build();
    }
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider()  {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customDetailService);
        provider.setPasswordEncoder(passwordEncoder());
        // Optionally configure password encoder here
        return provider;
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5174")); // Your Vite frontend URL
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}


