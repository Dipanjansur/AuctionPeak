package sur.dipanjan.AuctionPeak.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import sur.dipanjan.AuctionPeak.models.ErrorResponse;
import sur.dipanjan.AuctionPeak.services.customExceptions.*;

@RestControllerAdvice
public class GlobalCatchExcept {
    private static final Logger LOGGER= LoggerFactory.getLogger(GlobalCatchExcept.class);

    @ExceptionHandler(BadRequestError.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(BadRequestError ex) {
        return buildResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ForbiddenError.class)
    public ResponseEntity<ErrorResponse> handleForbidden(ForbiddenError ex) {
        return buildResponse(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(NotFoundError.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundError ex) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedError.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(UnauthorizedError ex) {
        return buildResponse(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ValidationError.class)
    public ResponseEntity<ErrorResponse> handleValidation(ValidationError ex) {
        return buildResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoResourceFound(NoResourceFoundException ex) {
        return buildResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<ErrorResponse> buildResponse(String message, HttpStatus status) {
        LOGGER.error("Exception: " + message);
        ErrorResponse response = new ErrorResponse(status.getReasonPhrase(), message, status.value());
        return new ResponseEntity<>(response, status);
    }

}
