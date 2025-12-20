package sur.dipanjan.AuctionPeak.models;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String username;
    private String firstName;
    private String lastName;
    private String bio;
}
