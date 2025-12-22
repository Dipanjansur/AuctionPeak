package sur.dipanjan.AuctionPeak.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sur.dipanjan.AuctionPeak.models.AuthResponse;
import sur.dipanjan.AuctionPeak.models.LoginRequest;
import sur.dipanjan.AuctionPeak.models.MessageResponse;
import sur.dipanjan.AuctionPeak.models.SignUpRequest;
import sur.dipanjan.AuctionPeak.models.UpdateProfileRequest;
import sur.dipanjan.AuctionPeak.models.UserResponse;
import sur.dipanjan.AuctionPeak.services.UserService;
import sur.dipanjan.AuctionPeak.services.customExceptions.NotFoundError;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse signInUser(@Valid @RequestBody SignUpRequest request) {
        return userService.signInUser(request);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginRequest request) {
        AuthResponse result = userService.loginUser(request);
        if (result == null) {
            throw new NotFoundError("User not found");
        }
        return result;
    }

    @GetMapping("/{userId}")
    public UserResponse getUsersById(@PathVariable Long userId) {
        UserResponse user = userService.getUserById(userId);
        if (user == null) {
            throw new NotFoundError("User not found");
        }
        return user;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{userId}")
    public UserResponse updateProfileData(@PathVariable Long userId,
            @Valid @RequestBody UpdateProfileRequest updates) {
        UserResponse updatedUser = userService.updateProfileData(userId, updates);
        if (updatedUser == null) {
            throw new NotFoundError("User not found");
        }
        return updatedUser;
    }

    @DeleteMapping("/{userId}")
    public MessageResponse<String> deleteUsers(@PathVariable Long userId) {
        boolean success = userService.deleteUser(userId);
        if (success) {
            return new MessageResponse<>("Successfully deleted");
        } else {
            throw new NotFoundError("User not found or already deleted");
        }
    }
}
