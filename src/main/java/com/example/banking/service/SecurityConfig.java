package com.example.banking.service;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final JwtRequestFilter jwtRequestFilter;
	private final UserDetailsService jwtUserDetailsService;
	
	public SecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtRequestFilter jwtRequestFilter,
			UserDetailsService jwtUserDetailsService) {
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
		this.jwtRequestFilter = jwtRequestFilter;
		this.jwtUserDetailsService = jwtUserDetailsService;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception{
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		authenticationManagerBuilder.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
		return authenticationManagerBuilder.build();
		
	}
	
	//Cross-site Request Forgery(csrf)
		@Bean
		public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
			httpSecurity.csrf(csrf -> csrf.disable())
			.cors(cors -> cors.configurationSource(corsConfigurationSource())) // Corrected CORS setup
						.authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/login","/api/register","/api/forgot-password", "/api/reset-password").permitAll()
//																	 .requestMatchers("/api/users/**").hasRole("ADMIN")
//																	 .requestMatchers("/api/user/{username}").hasAnyRole("ADMIN","USER")
																	.anyRequest().authenticated())
						.exceptionHandling(exceptional -> exceptional.authenticationEntryPoint(jwtAuthenticationEntryPoint))
						.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
			
			httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
			
			return httpSecurity.build();
		}
		
		 @Bean
		    public CorsConfigurationSource corsConfigurationSource() {
		        CorsConfiguration configuration = new CorsConfiguration();
		        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
		        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
		        configuration.setAllowedHeaders(Arrays.asList("*"));
		        configuration.setAllowCredentials(true); // Allow credentials if needed

		        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		        source.registerCorsConfiguration("/**", configuration);

		        return source;
		    }
	
}
