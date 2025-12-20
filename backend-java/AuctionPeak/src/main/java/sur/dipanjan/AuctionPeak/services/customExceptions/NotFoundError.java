package sur.dipanjan.AuctionPeak.services.customExceptions;

public class NotFoundError extends RuntimeException {
    public NotFoundError(String message) {
        super(message);
    }
}
