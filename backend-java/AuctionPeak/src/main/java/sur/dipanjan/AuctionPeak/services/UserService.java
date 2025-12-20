package sur.dipanjan.AuctionPeak.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sur.dipanjan.AuctionPeak.models.AuthResponse;
import sur.dipanjan.AuctionPeak.models.LoginRequest;
import sur.dipanjan.AuctionPeak.models.SignUpRequest;
import sur.dipanjan.AuctionPeak.models.UpdateProfileRequest;
import sur.dipanjan.AuctionPeak.models.UserResponse;
import sur.dipanjan.AuctionPeak.entities.User;
import sur.dipanjan.AuctionPeak.repository.UserRepository;
import sur.dipanjan.AuctionPeak.services.customExceptions.BadRequestError;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTManageService jwtManageService;

    // Helper method to map User entity to UserResponse DTO
    private UserResponse mapToResponse(User user) {
        if (user == null)
            return null;
        UserResponse response = new UserResponse();
        response.setUsersId(user.getUsersId());
        response.setUsername(user.getUsername());
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setEmail(user.getEmail());
        response.setBio(user.getBio());
        response.setIsPremium(user.getIsPremium());
        response.setProfilepic(user.getProfilepic());
        return response;
    }

    public AuthResponse signInUser(SignUpRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestError("Email already in use");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setBio(request.getBio());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        User savedUser = userRepository.save(user); // savedUser has generated ID

        String token = jwtManageService.generateToken(savedUser.getUsername());

        return new AuthResponse("User created successfully", savedUser.getUsersId(), token);
    }

    public AuthResponse loginUser(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return null;
        }
        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestError("Invalid username or password");
        }

        String token = jwtManageService.generateToken(user.getUsername());
        return new AuthResponse("logged in successfully", user.getUsersId(), token);
    }

    public UserResponse getUserById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        return mapToResponse(user);
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public UserResponse updateProfileData(Long userId, UpdateProfileRequest updates) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty())
            return null;

        User user = userOpt.get();
        if (updates.getUsername() != null)
            user.setUsername(updates.getUsername());
        if (updates.getFirstName() != null)
            user.setFirstName(updates.getFirstName());
        if (updates.getLastName() != null)
            user.setLastName(updates.getLastName());
        if (updates.getBio() != null)
            user.setBio(updates.getBio());

        User updatedUser = userRepository.save(user);
        return mapToResponse(updatedUser);
    }

    public boolean deleteUser(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
