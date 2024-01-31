package house.houseproject.service;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.domain.HUser;
import house.houseproject.dto.UserUpdateDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MypageService{

    private final HUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public MypageService(HUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public long userUpdate(UserUpdateDto userUpdateDto) {
        log.info("1234");
        HUser huser = userRepository.findByEmail(userUpdateDto.getEmail()); // null

        log.info("12345");
        huser.updateName(userUpdateDto.getName());
        log.info("12345678");
        huser.updateAddress(userUpdateDto.getAddress());
        huser.updatePhone(userUpdateDto.getPhone());

        log.info("123");
        // 회원 비밀번호 수정을 위한 패스워드 암호화
        String encodePw = passwordEncoder.encode(userUpdateDto.getPassword());
        huser.updatePassword(encodePw);

        log.info("123");
        userRepository.save(huser);

        log.info("123");
        return huser.getId();
    }

}
