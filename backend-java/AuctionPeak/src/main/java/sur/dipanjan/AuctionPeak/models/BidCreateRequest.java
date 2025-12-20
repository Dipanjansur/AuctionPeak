package sur.dipanjan.AuctionPeak.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class BidCreateRequest {
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Float amount;

    @NotNull(message = "Item ID is required")
    private Long itemId;
}
