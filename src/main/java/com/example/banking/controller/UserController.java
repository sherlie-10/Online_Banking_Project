package com.example.banking.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.banking.model.JwtRequest;
import com.example.banking.model.JwtResponse;
import com.example.banking.model.UserDTO;
import com.example.banking.service.JwtTokenUtil;
import com.example.banking.service.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception{
		
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
		
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		
		final String token = jwtTokenUtil.generateToken(userDetails);
		
		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		// TODO Auto-generated method stub
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (BadCredentialsException e) {
			// TODO: handle exception
			throw new Exception("INVALID_CREDENTIAL");
		}
		
	}
	
	
	@PostMapping("/register")
	public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserDTO userDTO){
		UserDTO registeredUser = userService.registerUser(userDTO);
		return ResponseEntity.ok(registeredUser);
	}
	
	// Get all users
		@GetMapping("/users")
		public ResponseEntity<List<UserDTO>> getAllUsers() {
			List<UserDTO> users = userService.getAllUsers();
			return ResponseEntity.ok(users);  // Return the list of users as the response
		}
		
	// Get user by username
		@GetMapping("/user/me")
		public ResponseEntity<UserDTO> getCurrentUser(Principal principal) {
		    // Use the username from the Principal object
		    String username = principal.getName();
		    
		    // Fetch the user details using the username
		    UserDTO userDTO = userService.getUserByUsername(username);
		    if (userDTO != null) {
		        return ResponseEntity.ok(userDTO);
		    }
		    return ResponseEntity.notFound().build();
		}
		
		// Update user by username
		@PutMapping("/user/{username}")
		public ResponseEntity<String> updateUser(@PathVariable String username, @RequestBody UserDTO userDTO) {
			userService.updateUser(username, userDTO);
			return ResponseEntity.ok("User updated successfully");
		}
		
		// Delete user by username
		@DeleteMapping("/user/{username}")
		public ResponseEntity<String> deleteUser(@PathVariable String username) {
			userService.deleteUser(username);
			return ResponseEntity.ok("User deleted successfully");
		}
}
