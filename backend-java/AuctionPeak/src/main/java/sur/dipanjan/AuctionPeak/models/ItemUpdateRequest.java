package sur.dipanjan.AuctionPeak.models;

import jakarta.validation.constraints.Positive;
import lombok.Data;
import sur.dipanjan.AuctionPeak.entities.ItemStatus;

@Data
public class ItemUpdateRequest {
    private String itemName;
    private String bio;
    private ItemStatus status;
    private String itemDescription;

    @Positive(message = "Price must be positive")
    private Double currentPrice;
}
