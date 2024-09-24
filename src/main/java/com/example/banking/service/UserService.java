//package com.example.banking.service;
//
//import java.util.HashSet;
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.web.server.ResponseStatusException;
//
//import com.example.banking.model.Role;
//import com.example.banking.model.RoleName;
//import com.example.banking.model.User;
//import com.example.banking.model.UserDTO;
//import com.example.banking.repository.RoleRepository;
//import com.example.banking.repository.UserRepo;
//@Service
//public class UserService {
//	
//	@Autowired
//	private UserRepo userRepo;
//	
//	@Autowired
//	private RoleRepository roleRepository;
//	
//	@Autowired
//	private PasswordEncoder passwordEncoder;
//	
//	public UserDTO registerUser(UserDTO userDTO) {
//		// TODO Auto-generated method stub
//		// Check if user already exists
//        if (userRepo.findByUsername(userDTO.getUsername()) != null) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
//        }
////        if (userRepo.findByEmail(userDTO.getEmail()) != null) {
////            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
////        }
//     // Create new User entity
//        User user = new User();
//        user.setUsername(userDTO.getUsername());
//        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encode the password
//        user.setEmail(userDTO.getEmail());
//        user.setFirstName(userDTO.getFirstName());
//        user.setLastName(userDTO.getLastName());
//        user.setMobileNumber(userDTO.getMobileNumber());
//        user.setGender(userDTO.getGender());
//        user.setAadharNumber(userDTO.getAadharNumber());
//        user.setPanNumber(userDTO.getPanNumber());
//        user.setDateOfBirth(userDTO.getDateOfBirth());
//        user.setCity(userDTO.getCity());
//        user.setState(userDTO.getState());
//        user.setAddress(userDTO.getAddress());
//        user.setPincode(userDTO.getPincode());
//        user.setCreatedDate(userDTO.getCreatedDate());
//
//        
//	//----------------------
//     // Assign default role 'USER'
//        Set<Role> roles = new HashSet<>();
//        Role userRole = roleRepository.findByName(RoleName.USER)
//            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role USER not found"));
//        roles.add(userRole);
//
//        // If additional roles are provided, add them
//        if (userDTO.getRoles() != null && !userDTO.getRoles().isEmpty()) {
//            for (String roleName : userDTO.getRoles()) {
//                if (roleName.equalsIgnoreCase("ADMIN")) {
//                    Role adminRole = roleRepository.findByName(RoleName.ADMIN)
//                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role ADMIN not found"));
//                    roles.add(adminRole);
//                }
//            }
//        }
//
//        user.setRoles(roles);  // Set roles to the user
//
//        User savedUser = userRepo.save(user);
//
//        // Convert saved User entity to UserDTO and return (excluding password)
//        return new UserDTO(
//            savedUser.getId(),
//            savedUser.getUsername(),
//            null, // Password should not be exposed
//            savedUser.getEmail(),
//            savedUser.getFirstName(),
//            savedUser.getLastName(),
//            savedUser.getMobileNumber(),
//            savedUser.getAadharNumber(),
//            savedUser.getPanNumber(),
//            savedUser.getGender(),
//            savedUser.getCity(),
//            savedUser.getState(),
//            savedUser.getPincode(),
//            savedUser.getAddress(),
//            savedUser.getDateOfBirth(),
//            savedUser.getCreatedDate()
//        );
//    }
//
//	
//	
//	
//	public List<UserDTO> getAllUsers() {
//		List<User> users = userRepo.findAll();  // Fetch all users from the repository
//		// Map User entities to UserDTO objects
//		return users.stream().map(user -> new UserDTO(
//				user.getId(),
//				user.getUsername(),
//				user.getPassword(),
//				user.getEmail(),
//				user.getFirstName(),
//				user.getLastName(),
//				user.getMobileNumber(),
//				user.getAadharNumber(),
//				user.getPanNumber(),
//				user.getGender(),
//				user.getCity(),
//				user.getState(),
//				user.getPincode(),
//				user.getAddress(),
//				user.getDateOfBirth(),
//				user.getCreatedDate()
//		)).collect(Collectors.toList());
//	}
//	
//	// Get user by username
//	public UserDTO getUserByUsername(String username) {
//		User user = userRepo.findByUsername(username);
//		if (user != null) {
//			return new UserDTO(
//				user.getId(),
//				user.getUsername(),
//				user.getPassword(),
//				user.getEmail(),
//				user.getFirstName(),
//				user.getLastName(),
//				user.getMobileNumber(),
//				user.getAadharNumber(),
//				user.getPanNumber(),
//				user.getGender(),
//				user.getCity(),
//				user.getState(),
//				user.getPincode(),
//				user.getAddress(),
//				user.getDateOfBirth(),
//				user.getCreatedDate()
//			);
//		}
//		return null;  // Handle user not found scenario
//	}
//	
//	// Update user by username
//		public void updateUser(String username, UserDTO userDTO) {
//			User user = userRepo.findByUsername(username);
//			if (user != null) {
//				user.setEmail(userDTO.getEmail());
//				user.setFirstName(userDTO.getFirstName());
//				user.setLastName(userDTO.getLastName());
//				user.setMobileNumber(userDTO.getMobileNumber());
//				user.setGender(userDTO.getGender());
//				user.setAadharNumber(userDTO.getAadharNumber());
//				user.setPanNumber(userDTO.getPanNumber());
//				user.setDateOfBirth(userDTO.getDateOfBirth());
//				user.setCity(userDTO.getCity());
//				user.setState(userDTO.getState());
//				user.setAddress(userDTO.getAddress());
//				user.setPincode(userDTO.getPincode());
//				user.setPassword(passwordEncoder.encode(userDTO.getPassword()));  // Re-encode password if changed
//				
//				userRepo.save(user);
//			}
//		}
//		
//		// Delete user by username
//		public void deleteUser(String username) {
//			User user = userRepo.findByUsername(username);
//			if (user != null) {
//				userRepo.delete(user);
//			}
//		}
//		
//		
//
//}

package com.example.banking.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.banking.model.Role;
import com.example.banking.model.RoleName;
import com.example.banking.model.User;
import com.example.banking.model.UserDTO;
import com.example.banking.repository.RoleRepository;
import com.example.banking.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private EmailService emailService;

    // Helper method to map UserDTO to User entity
    private User mapToUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encode the password
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setGender(userDTO.getGender());
        user.setAadharNumber(userDTO.getAadharNumber());
        user.setPanNumber(userDTO.getPanNumber());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setCity(userDTO.getCity());
        user.setState(userDTO.getState());
        user.setAddress(userDTO.getAddress());
        user.setPincode(userDTO.getPincode());
        user.setCreatedDate(userDTO.getCreatedDate());

        return user;
    }

    // Helper method to map User entity to UserDTO
    private UserDTO mapToUserDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            null, // Do not nullify the password
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getMobileNumber(),
            user.getAadharNumber(),
            user.getPanNumber(),
            user.getGender(),
            user.getCity(),
            user.getState(),
            user.getPincode(),
            user.getAddress(),
            user.getDateOfBirth(),
            user.getCreatedDate()
        );
    }

    public UserDTO registerUser(UserDTO userDTO) {
        // Check if user already exists
        if (userRepo.findByUsername(userDTO.getUsername()) != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }
     // Check if email exists
        if (userRepo.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        // Check if mobile number exists
        if (userRepo.findByMobileNumber(userDTO.getMobileNumber()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Mobile number already exists");
        }


        // Create new User entity
        User user = mapToUser(userDTO);

        // Assign default role 'USER'
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(RoleName.USER)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role USER not found"));
        roles.add(userRole);

        // If additional roles are provided, add them
        if (userDTO.getRoles() != null && !userDTO.getRoles().isEmpty()) {
            for (String roleName : userDTO.getRoles()) {
                if (roleName.equalsIgnoreCase("ADMIN")) {
                    Role adminRole = roleRepository.findByName(RoleName.ADMIN)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role ADMIN not found"));
                    roles.add(adminRole);
                }
            }
        }

        user.setRoles(roles);  // Set roles to the user

        try {
            User savedUser = userRepo.save(user);

            // Send registration email
            emailService.sendRegistrationEmail(savedUser.getEmail(), savedUser.getUsername(), savedUser.getFirstName());

            return mapToUserDTO(savedUser);  // Convert saved user to DTO and return
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Duplicate or invalid data: " + ex.getMostSpecificCause().getMessage());
        } catch (Exception e) {
            // Handle email sending failure separately
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User created, but failed to send registration email: " + e.getMessage());
        }
    }

    //---------------------------------------------
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepo.findAll();  // Fetch all users from the repository
        // Map User entities to UserDTO objects
        return users.stream().map(this::mapToUserDTO).collect(Collectors.toList());
    }

    public UserDTO getUserByUsername(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            return mapToUserDTO(user);
        }
        return null;  // Handle user not found scenario
    }

    public void updateUser(String username, UserDTO userDTO) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            user.setEmail(userDTO.getEmail());
            user.setFirstName(userDTO.getFirstName());
            user.setLastName(userDTO.getLastName());
            user.setMobileNumber(userDTO.getMobileNumber());
            user.setGender(userDTO.getGender());
            user.setAadharNumber(userDTO.getAadharNumber());
            user.setPanNumber(userDTO.getPanNumber());
            user.setDateOfBirth(userDTO.getDateOfBirth());
            user.setCity(userDTO.getCity());
            user.setState(userDTO.getState());
            user.setAddress(userDTO.getAddress());
            user.setPincode(userDTO.getPincode());

            
            // Re-encode the password only if it is changed
            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }

            userRepo.save(user);
        }
    }

    public void deleteUser(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            userRepo.delete(user);
        }
    }
    
    
    //----------------------------------------------------------
    
    
}

