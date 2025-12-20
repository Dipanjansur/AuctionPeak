package sur.dipanjan.AuctionPeak.models;

import jakarta.validation.constraints.Future;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuctionUpdateRequest {
    private String name;

    @Future(message = "Start time must be in the future")
    private LocalDateTime startTime;

    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;

    private String auctionDetails;
}
