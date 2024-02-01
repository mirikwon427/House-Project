package house.houseproject.domain;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonInclude;
import house.houseproject.dto.LoginDto;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Message {

    private StatusEnum success;
    private String message;
    private Object data;
    private String token;
    private LoginDto user;
    private int registeredHouseId;

    public Message() {
        this.success = StatusEnum.BAD_REQUEST;
        this.data = null;
        this.message = null;
    }

    public Message(String token, LoginDto user, boolean success) {
        this.token = token;
        this.user = user;
        this.success = StatusEnum.BAD_REQUEST;
    }

    public Message(String token, LoginDto user, boolean success,String message) {
        this.token = token;
        this.user = user;
        this.success = StatusEnum.BAD_REQUEST;
        this.message = message;
    }

    public Message(int registeredHouseId, boolean success) {
        this.registeredHouseId = registeredHouseId;
        this.success = StatusEnum.BAD_REQUEST;
    }
}
