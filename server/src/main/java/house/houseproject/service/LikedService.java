package house.houseproject.service;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.Repository.LikedRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Liked;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.dto.LikedDto;
import house.houseproject.exception.DuplicateMemberException;
import house.houseproject.exception.NotFoundMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikedService {
    private final HUserRepository userRepository;
    private final RegisteredHouseRepository registeredHouseRepository;
    private final LikedRepository likedRepository;

    @Transactional
    public void insert(LikedDto likedDto) throws Exception {

        HUser user = userRepository.findById(likedDto.getUserId())
                .orElseThrow(() -> new NotFoundMemberException("Could not find user with id: " + likedDto.getUserId()));

        RegisteredHouse registeredHouse = registeredHouseRepository.findByRegisteredHouseId(likedDto.getRegisteredHouseId())
                .orElseThrow(() -> new NotFoundMemberException("Could not find registeredHouse with id: " + likedDto.getRegisteredHouseId()));

        // 중복 체크
        if (likedRepository.findByUserAndRegisteredHouse(user, registeredHouse).isPresent()) {
            throw new DuplicateMemberException("false", "이미 매물을 찜하셨습니다.");
        }

        // 중복 체크 후에 예외를 던지지 않고 바로 저장
        Liked liked = Liked.builder()
                .user(user)
                .registeredHouse(registeredHouse)
                .build();

        likedRepository.save(liked);
    }

    @Transactional
    public void delete(LikedDto likedDto) {
        HUser user = userRepository.findById(likedDto.getUserId())
                .orElseThrow(() -> new NotFoundMemberException("Could not found user id : " + likedDto.getUserId()));

        RegisteredHouse registeredHouse = registeredHouseRepository.findByRegisteredHouseId(likedDto.getRegisteredHouseId())
                .orElseThrow(() -> new NotFoundMemberException("Could not found registerdHouse id : " + likedDto.getRegisteredHouseId()));

        Liked liked = likedRepository.findByUserAndRegisteredHouse(user, registeredHouse)
                .orElseThrow(() -> new NotFoundMemberException("Could not found liked id"));

        likedRepository.delete(liked);
    }

}
