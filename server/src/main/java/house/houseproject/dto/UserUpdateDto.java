package house.houseproject.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateDto {

    private String email;
    private String password;
    private String name;
    private String phone;
    private String address;
    private int age;

    public UserUpdateDto(String email, String password, String name, int age, String phone, String address) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }




}