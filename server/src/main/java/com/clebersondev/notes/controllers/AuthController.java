package com.clebersondev.notes.controllers;

import com.clebersondev.notes.exceptions.AppException;
import com.clebersondev.notes.models.Role;
import com.clebersondev.notes.models.RoleName;
import com.clebersondev.notes.models.User;
import com.clebersondev.notes.payloads.*;
import com.clebersondev.notes.repositories.RoleRepository;
import com.clebersondev.notes.repositories.UserRepository;
import com.clebersondev.notes.security.JwtTokenProvider;
import com.clebersondev.notes.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = tokenProvider.generateToken(auth);

        UserPrincipal userAuthenticated = (UserPrincipal) auth.getPrincipal();

        return ResponseEntity.ok(
                new JwtAuthResponse<UserDetailsResponse>(
                        true,
                        "Successfuly authenticaed",
                        jwt,
                        new UserDetailsResponse(
                                userAuthenticated.getName(),
                                userAuthenticated.getUsername(),
                                userAuthenticated.getEmail()
                        )
                )
        );
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return new ResponseEntity(
                    new ApiResponse(false, "Username is already taken"),
                    HttpStatus.BAD_REQUEST
            );
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new ResponseEntity(
                    new ApiResponse(false, "Email address already in use"),
                    HttpStatus.BAD_REQUEST
            );
        }

        User user = new User(
                registerRequest.getName(),
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                registerRequest.getPassword()
        );
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity
                .created(location)
                .body(new ApiResponseWithData<UserDetailsResponse>(
                        true,
                        "User registered successfully",
                        new UserDetailsResponse(
                                result.getName(),
                                result.getUsername(),
                                result.getEmail()
                        )
                ));

    }
}
