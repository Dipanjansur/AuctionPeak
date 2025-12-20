package sur.dipanjan.AuctionPeak.services.customExceptions;

public class UnauthorizedError extends RuntimeException {
    public UnauthorizedError(String message) {
        super(message);
    }
}
