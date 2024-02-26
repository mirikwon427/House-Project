package house.houseproject.domain;


import com.fasterxml.jackson.annotation.JsonInclude;
import house.houseproject.dto.RegisteredHouseDto;
import house.houseproject.dto.UserUpdateDto;
import lombok.Data;

import house.houseproject.dto.LoginDto;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Message {


    private StatusEnum success;
    private String message;
    private Object data;
    private String token;

    private Object user;
    private UserUpdateDto updateUser;

    private Long totalCount;
    private Integer registeredHouseId;

    private ArrayList<RegisteredHouseDto> registeredHouse;
    private List<RegisteredHouseDto> registeredHouses;
    private RegisteredHouseDto registeredHouseDto;
    private StatusEnum isLiked;


    public Message() {
        this.success = StatusEnum.BAD_REQUEST;
        this.data = null;
        this.message = null;
    }

    public Message(UserUpdateDto updateUser, String message) {

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

    public Message(int registeredHouseId, boolean success) {
        this.registeredHouseId = registeredHouseId;
        this.success = StatusEnum.BAD_REQUEST;
    }
}

