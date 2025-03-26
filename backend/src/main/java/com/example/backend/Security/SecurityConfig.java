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
                .csrf().disable()
                .authorizeRequests()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/analyze/**").permitAll()
                .requestMatchers("/api/test/**").hasAnyRole("ADMIN","EVALUATOR")
                .requestMatchers("/api/user-test/**").hasRole("CANDIDAT")
                .requestMatchers("/api/user/**").permitAll()
                .requestMatchers("/api/quiz/**").hasAnyRole("EVALUATOR")
                .requestMatchers("/api/problem/**").hasAnyRole("EVALUATOR")
                .requestMatchers("/api/test-submission/**").hasRole("EVALUATOR")
                .requestMatchers("/api/dash/**").hasRole("ADMIN")
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

}


