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

    public void updateUserInfo(String email, String password, String name, String phone, String address, int age) {
        setEmail(email);
        setPassword(password);
        setName(name);
        setPhone(phone);
        setAddress(address);
        setAge(age);
    }

}