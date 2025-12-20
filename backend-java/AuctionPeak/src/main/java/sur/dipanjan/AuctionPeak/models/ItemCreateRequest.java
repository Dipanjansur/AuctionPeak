package sur.dipanjan.AuctionPeak.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import sur.dipanjan.AuctionPeak.entities.ItemStatus;

@Data
public class ItemCreateRequest {
    @NotBlank(message = "Item Name is required")
    private String itemName;

    @NotBlank(message = "Bio is required")
    private String bio;

    @NotNull(message = "Status is required")
    private ItemStatus status;

    @NotBlank(message = "Item Description is required")
    private String itemDescription;

    @NotNull(message = "Current Price is required")
    @Positive(message = "Price must be positive")
    private Double currentPrice;

    // Optional: Auction ID if creating item directly under an auction
    // The Node.js example doesn't explicitly show auctionId in body but implied
    // logic might exist
    // Keeping it out for now unless needed, or assuming item is created
    // independently then assigned?
    // Node payload just has item fields.
}
