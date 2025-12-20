package sur.dipanjan.AuctionPeak.services.customExceptions;

public class ValidationError extends RuntimeException {
    public ValidationError(String message) {
        super(message);
    }
}
