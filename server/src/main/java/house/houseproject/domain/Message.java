package house.houseproject.domain;

import lombok.Data;

@Data
public class Message {

    private StatusEnum success;
    private String message;
    private Object data;

    public Message() {
        this.success = StatusEnum.BAD_REQUEST;
        this.data = null;
        this.message = null;
    }
}
