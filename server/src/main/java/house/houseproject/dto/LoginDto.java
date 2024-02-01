package house.houseproject.dto;

import lombok.*;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginDto {

    @NotNull
    @Size(min = 3, max = 200)
    private String email;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;


    private Integer id;


    private String name;

    private Integer age;


    private String phone;

    private String address;

    public LoginDto(Integer id, String email, String name, int age, String phone, String address) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }
}
