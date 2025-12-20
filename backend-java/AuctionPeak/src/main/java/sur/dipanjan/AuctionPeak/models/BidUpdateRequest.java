package sur.dipanjan.AuctionPeak.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class BidUpdateRequest {
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Float amount;
}
