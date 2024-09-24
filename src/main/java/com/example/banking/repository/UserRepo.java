package com.example.banking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.banking.model.User;
@Repository
public interface UserRepo extends JpaRepository<User, Long> {
//	public User findByUsername(String username);
	User findByUsername(String username);
//	public Object findByEmail(String email);
	 Optional<User> findByEmail(String email);  
	 Optional<User> findByMobileNumber(String mobileNumber); 
}
