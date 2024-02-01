package house.houseproject.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import house.houseproject.dto.UserUpdateDto;
import lombok.Data;
import org.springframework.boot.web.server.ErrorPage;
import house.houseproject.dto.LoginDto;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Message {

    private boolean common;
    private StatusEnum success;
    private String message;
    private Object data;
    private String token;
    private LoginDto user;
    private UserUpdateDto updateUser;


    public Message() {
        this.success = StatusEnum.BAD_REQUEST;
        this.data = null;
        this.message = null;
    }

    public Message(boolean common, UserUpdateDto updateUser, String message) {
        this.common = common;
        this.updateUser = updateUser;
        this.message = message;
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




}