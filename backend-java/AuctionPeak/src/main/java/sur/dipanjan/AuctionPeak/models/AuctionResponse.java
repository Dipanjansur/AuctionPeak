package sur.dipanjan.AuctionPeak.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import sur.dipanjan.AuctionPeak.entities.PremiumStatus;
import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuctionResponse {

    private Long auctionId;
    private String name;
    private String auctionDetails;
    private PremiumStatus isPremium;
    private String auctionPic;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean active;
    private String activeTime;

    // Created By Relation
    private UsersResponse createdBy;
    private Long createdById;
    private String createdByName;

    // Auctioned Items Relation
    private List<ItemsResponse> auctionedItemsDetails;
    private List<LazyItemsResponse> auctionedItems;

    // Participants Relation
    private List<UsersResponse> participantsDetails;
    private List<LazyParticipantsResponse> participants;

    @Data
    public static class LazyItemsResponse {
        private Long itemId;
        private String itemName;
    }

    @Data
    public static class LazyParticipantsResponse {
        private Long userId;
        private String userName;
    }
}
