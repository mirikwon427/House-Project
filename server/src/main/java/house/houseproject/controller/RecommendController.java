package house.houseproject.controller;


import house.houseproject.Repository.HUserRepository;
import house.houseproject.Repository.LikedRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.Repository.RegisteredHouseRepositoryImpl;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.RegisteredHouseDto;
import house.houseproject.dto.UserDto;
import house.houseproject.service.RecommendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class RecommendController {


    private final RecommendService recommendService;

    private final LikedRepository likedRepository;

    private final RegisteredHouseRepository registeredHouseRepository;

    private final HUserRepository userRepository;

    private final RegisteredHouseRepositoryImpl registeredHouseRepositoryImpl;

    @GetMapping("/recommend/{id}")
    public ResponseEntity<?> RecommendHouse(@PathVariable int id, @AuthenticationPrincipal UserDetails userDetails,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "6") int size, ModelMap model) {

        if (userDetails == null) {
            log.error("userDetails == null");
            return new ResponseEntity<>(Map.of("success", false, "message", "로그인 하세요."), HttpStatus.INTERNAL_SERVER_ERROR);
        }



        try {
            page -= 1;

            PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "registeredHouseId"));
            HUser user = userRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Could not found user id : " + id));

            UserDto userDto = UserDto.from(user);

            String sggNm = registeredHouseRepositoryImpl.getLikedRegisteredHouseCountBySggNm(user.getId());
            log.info("sggNm : {}", sggNm);
            ArrayList<RegisteredHouseDto> registeredHouseList = new ArrayList<>();
            if(sggNm != null) {

                log.info("sggNm : {} ", sggNm);
                Page<RegisteredHouse> recommendHouses = registeredHouseRepository.findBySggNm(sggNm,pageRequest);


                for (RegisteredHouse house : recommendHouses) {
                    RegisteredHouseDto registeredHouseDto = RegisteredHouseDto.from(house);
                    registeredHouseList.add(registeredHouseDto);
                }
            } else {
                PageRequest pageRequest1 = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "registeredHouseId"));
                // 주소에 해당되는 등록된 매물 가져오기
                Page<RegisteredHouse> recommendHouses = recommendService.findUserAddress(userDto.getAddress(),pageRequest1);



                for (RegisteredHouse house : recommendHouses) {
                    RegisteredHouseDto registeredHouseDto = RegisteredHouseDto.from(house);
                    registeredHouseList.add(registeredHouseDto);
                }
            }

            model.addAttribute("recommendHouse", registeredHouseList);

            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
            message.setRegisteredHouse(registeredHouseList);

            return new ResponseEntity<>(message, HttpStatus.OK);

        } catch(Exception e){
            log.error("Error occurred while fetching recommended properties: {}", e.getMessage());
            return new ResponseEntity<>(Map.of("success", false, "message", "추천 매물을 불러오는 중에 오류가 발생했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



}
