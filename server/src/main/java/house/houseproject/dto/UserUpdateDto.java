package house.houseproject.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {

    private Integer id;
    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String name;
    @NotNull
    private String phone;
    @NotNull
    private String address;
    @NotNull
    private Integer age;

    public UserUpdateDto(int id,String email, String password, String name, int age, String phone, String address) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }




}