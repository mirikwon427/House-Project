package house.houseproject.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

    private String token;

    private Integer id;

    private String email;

    private String name;

    private int age;

    private String phone;

    private String address;

    private boolean success;


    public TokenDto(String token, Integer id, String email, String name, int age, String phone, String address) {
        this.token = token;
        this.id = id;
        this.email = email;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
        this.success = true;  // 성공했을 경우에 true로 설정
    }
}

