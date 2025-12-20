package sur.dipanjan.AuctionPeak.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import sur.dipanjan.AuctionPeak.entities.PremiumStatus;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {
    private Long usersId;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String bio;
    private PremiumStatus isPremium;
    private String profilepic;
}
