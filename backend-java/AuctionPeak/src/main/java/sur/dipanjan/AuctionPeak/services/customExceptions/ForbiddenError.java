package sur.dipanjan.AuctionPeak.services.customExceptions;

public class ForbiddenError extends RuntimeException {
    public ForbiddenError(String message) {
        super(message);
    }
}
