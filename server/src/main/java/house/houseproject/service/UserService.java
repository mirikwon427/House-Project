package house.houseproject.service;

import java.util.Collections;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.domain.Authority;
import house.houseproject.domain.HUser;
import house.houseproject.dto.UserDto;
import house.houseproject.exception.DuplicateMemberException;
import house.houseproject.exception.NotFoundMemberException;
import house.houseproject.util.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final HUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(HUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserDto signup(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다.");
        }

        HUser user = HUser.builder()
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .name(userDto.getName())
                .age(userDto.getAge())
                .phone(userDto.getPhone())
                .address(userDto.getAddress())
                .authority(Authority.USER)
                .build();

        return UserDto.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public UserDto getUserWithAuthorities(String email) {
        return UserDto.from(userRepository.findOneWithAuthoritiesByEmail(email).orElse(null));
    }

    @Transactional(readOnly = true)
    public UserDto getMyUserWithAuthorities() {
        return UserDto.from(
                SecurityUtil.getCurrentUsername()
                        .flatMap(userRepository::findOneWithAuthoritiesByEmail)
                        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
        );
    }

}