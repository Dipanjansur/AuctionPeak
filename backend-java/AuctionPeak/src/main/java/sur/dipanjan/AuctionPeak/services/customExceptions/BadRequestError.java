package sur.dipanjan.AuctionPeak.services.customExceptions;

public class BadRequestError extends RuntimeException {
    public BadRequestError(String message) {
        super(message);
    }
}
