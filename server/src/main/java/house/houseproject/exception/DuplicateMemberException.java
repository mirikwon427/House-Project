package house.houseproject.exception;

public class DuplicateMemberException extends Exception {
    private final String success;
    private final String customMessage;

    public DuplicateMemberException(String success, String customMessage) {
        super("status: 409, success:" + success + ", message:" + customMessage);
        this.success = success;
        this.customMessage = customMessage;
    }

    public String getSuccess() {
        return success;
    }

    public String getCustomMessage() {
        return customMessage;
    }

    @Override
    public String getMessage() {
        return customMessage;
    }

    @Override
    public String toString() {
        return "{" +
                "\"status\": 409," +
                "\"success\": \"" + success + "\"," +
                "\"message\": \"" + customMessage + "\"," +
                "\"fieldErrors\": []" +
                "}";
    }
//    public DuplicateMemberException() {
//        super();
//    }
//    public DuplicateMemberException(String message, Throwable cause) {
//        super(message, cause);
//    }
//    public DuplicateMemberException(String message) {
//        super(message);
//    }
//    public DuplicateMemberException(Throwable cause) {
//        super(cause);
//    }
}
