package house.houseproject.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import house.houseproject.domain.HUser;
import lombok.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private int id;

    @NotNull
    @Size(min = 3, max = 200)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 3, max = 100)
    private String password;

    @NotNull
    @Size(min = 3, max = 50)
    private String name;

    @NotNull
    private int age;

    @NotNull
    @Size(min = 3, max = 50)
    private String phone;

    @NotNull
    @Size(min = 3, max = 500)
    private String address;


    public static UserDto from(HUser user) {
        if(user == null) return null;

        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .age(user.getAge())
                .phone(user.getPhone())
                .address(user.getAddress())
                .build();
    }
}