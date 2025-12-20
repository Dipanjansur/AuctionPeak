package sur.dipanjan.AuctionPeak.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import sur.dipanjan.AuctionPeak.entities.Auction;
import sur.dipanjan.AuctionPeak.entities.User;
import sur.dipanjan.AuctionPeak.models.AuctionCreateRequest;
import sur.dipanjan.AuctionPeak.models.AuctionUpdateRequest;
import sur.dipanjan.AuctionPeak.repository.AuctionRepository;
import sur.dipanjan.AuctionPeak.repository.UserRepository;
import sur.dipanjan.AuctionPeak.services.customExceptions.BadRequestError;

import sur.dipanjan.AuctionPeak.services.customExceptions.NotFoundError;
import sur.dipanjan.AuctionPeak.services.customExceptions.UnauthorizedError;

import sur.dipanjan.AuctionPeak.models.AuctionResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuctionService {
    private static final Logger LOGGER= LoggerFactory.getLogger(AuctionService.class);
    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || authentication.getPrincipal().equals("anonymousUser")) {
            throw new UnauthorizedError("User is not authenticated");
        }
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UnauthorizedError("User not found"));
    }

    public List<AuctionResponse> getAllAuctions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        LOGGER.info(authentication.getAuthorities().toString());
        List<Auction> auctions;
        if (isAdmin) {
            auctions = auctionRepository.findAll();
        } else {
            User user = getAuthenticatedUser();
            auctions = auctionRepository.findByCreatedBy(user);
        }
        return auctions.stream().map(this::mapToAuctionResponse).collect(Collectors.toList());
    }

    public AuctionResponse getAuctionById(Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundError("Auction not found"));
        return mapToAuctionResponse(auction);
    }

    public AuctionResponse createAuction(AuctionCreateRequest request) {
        User user = getAuthenticatedUser();
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new BadRequestError("End time must be after start time");
        }

        Auction auction = new Auction();
        auction.setName(request.getName());
        auction.setStartTime(request.getStartTime());
        auction.setEndTime(request.getEndTime());
        auction.setAuctionDetails(request.getAuctionDetails());
        auction.setCreatedBy(user);

        Auction savedAuction = auctionRepository.save(auction);
        return mapToAuctionResponse(savedAuction);
    }

    public AuctionResponse updateAuction(Long auctionId, AuctionUpdateRequest request) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundError("Auction not found"));

        if (request.getName() != null)
            auction.setName(request.getName());
        if (request.getStartTime() != null)
            auction.setStartTime(request.getStartTime());
        if (request.getEndTime() != null)
            auction.setEndTime(request.getEndTime());
        if (request.getAuctionDetails() != null)
            auction.setAuctionDetails(request.getAuctionDetails());

        if (auction.getEndTime().isBefore(auction.getStartTime())) {
            throw new BadRequestError("End time must be after start time");
        }

        return mapToAuctionResponse(auctionRepository.save(auction));
    }

    public void deleteAuction(Long auctionId) {
        auctionRepository.findById(auctionId)
                .orElseThrow(() -> new NotFoundError("Auction not found"));
    }

    // private AuctionResponse mapToAuctionResponse(Auction auction) {
    // AuctionResponse response = new AuctionResponse();
    // response.setAuctionId(auction.getAuctionId());
    // response.setName(auction.getName());
    // response.setAuctionDetails(auction.getAuctionDetails());
    // response.setIsPremium(auction.getIsPremium());
    // response.setAuctionPic(auction.getAuctionPic());
    // response.setStartTime(auction.getStartTime());
    // response.setEndTime(auction.getEndTime());
    // LocalDateTime now = LocalDateTime.now();
    // response.setActive(!now.isBefore(auction.getStartTime()) &&
    // now.isBefore(auction.getEndTime()));

    // if (now.isBefore(auction.getStartTime())) {
    // response.setActiveTime("starting in " + formatDuration(Duration.between(now,
    // auction.getStartTime())));
    // } else if (now.isBefore(auction.getEndTime())) {
    // response.setActiveTime("ending in " + Duration.between(now,
    // auction.getEndTime()).toMinutes() + " min");
    // } else {
    // response.setActiveTime("ended before " +
    // formatDuration(Duration.between(auction.getEndTime(), now)));
    // }

    // if (auction.getCreatedBy() != null) {
    // response.setCreatedById(auction.getCreatedBy().getUserId());
    // response.setCreatedByName(auction.getCreatedBy().getUsername());
    // }

    // if (auction.getParticipants() != null) {
    // List<AuctionResponse.LazyParticipantsResponse> participants =
    // auction.getParticipants().stream()
    // .map(p -> {
    // AuctionResponse.LazyParticipantsResponse lp = new
    // AuctionResponse.LazyParticipantsResponse();
    // lp.setUserId(p.getUserId());
    // lp.setUserName(p.getUsername());
    // return lp;
    // }).collect(Collectors.toList());
    // response.setParticipants(participants);
    // }

    // if (auction.getAuctionedItems() != null) {
    // List<AuctionResponse.LazyItemsResponse> items =
    // auction.getAuctionedItems().stream()
    // .map(i -> {
    // AuctionResponse.LazyItemsResponse li = new
    // AuctionResponse.LazyItemsResponse();
    // li.setItemId(i.getItemId());
    // li.setItemName(i.getItemName());
    // return li;
    // }).collect(Collectors.toList());
    // response.setAuctionedItems(items);
    // }

    // return response;
    // }

    private AuctionResponse mapToAuctionResponse(Auction auction) {
        AuctionResponse response = new AuctionResponse();
        response.setAuctionId(auction.getAuctionId());
        response.setName(auction.getName());
        response.setAuctionDetails(auction.getAuctionDetails());
        response.setIsPremium(auction.getIsPremium());
        response.setAuctionPic(auction.getAuctionPic());
        response.setStartTime(auction.getStartTime());
        response.setEndTime(auction.getEndTime());
        LocalDateTime now = LocalDateTime.now();
        response.setActive(!now.isBefore(auction.getStartTime()) &&
                now.isBefore(auction.getEndTime()));
        if (now.isBefore(auction.getStartTime())) {
            response.setActiveTime("starting in " + formatDuration(Duration.between(now, auction.getStartTime())));
        } else if (now.isBefore(auction.getEndTime())) {
            response.setActiveTime("ending in " + Duration.between(now, auction.getEndTime()).toMinutes() + " min");
        } else {
            response.setActiveTime("ended before " +
                    formatDuration(Duration.between(auction.getEndTime(), now)));
        }
        response.setCreatedById(auction.getCreatedBy().getUsersId());
        response.setCreatedByName(auction.getCreatedBy().getUsername());
        return response;
    }

    private String formatDuration(Duration duration) {
        long days = duration.toDays();
        if (days > 0) {
            return days + " days";
        }
        long hours = duration.toHours();
        if (hours > 0) {
            return hours + " hours";
        }
        return duration.toMinutes() + " minutes";
    }
}
