package house.houseproject.service;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.domain.HUser;
import house.houseproject.dto.LoginDto;
import house.houseproject.dto.UserUpdateDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
public class MypageService{

    private final HUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public MypageService(HUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public Integer userUpdate(UserUpdateDto userUpdateDto) {

        HUser huser = userRepository.findByEmail(userUpdateDto.getEmail());

        huser.updateName(userUpdateDto.getName());
        huser.updateAddress(userUpdateDto.getAddress());
        huser.updatePhone(userUpdateDto.getPhone());

        String encodePw = passwordEncoder.encode(userUpdateDto.getPassword());
        huser.updatePassword(encodePw);

        userRepository.save(huser);

        return huser.getId();
    }

}
