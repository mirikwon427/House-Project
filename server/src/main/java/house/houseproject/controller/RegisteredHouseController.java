package house.houseproject.controller;

import house.houseproject.Repository.LikedRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.*;
import house.houseproject.dto.RegisteredHouseDto;
import house.houseproject.exception.DuplicateMemberException;
import house.houseproject.exception.NotFoundMemberException;
import house.houseproject.service.RegisteredHouseService;
import house.houseproject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RegisteredHouseController {
    private final RegisteredHouseService registeredHouseService;
    private final UserService userService;
    private final RegisteredHouseRepository registeredHouseRepository;
    private final LikedRepository likedRepository;

    @PostMapping("/house")
    public ResponseEntity<?> registeredHouse(
            @Valid @RequestBody RegisteredHouseDto registeredHouseDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            log.error("userDetails == null");
            return new ResponseEntity<>(Map.of("success", false, "message", "로그인 후 매물 등록이 가능합니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            log.info("Trying to register a house: {}", registeredHouseDto);
            String loginEmail = userDetails.getUsername();

            HUser user = userService.findByEmail(loginEmail);
            // userDetails에서 사용자 정보 추출
            int userId = user.getId();

            // userId를 RegisteredHouseDto에 설정
            registeredHouseDto.setUser_id(userId);
            log.info("Successfully registered a house: {}", userId);
            RegisteredHouseDto register = registeredHouseService.registeredHouse(registeredHouseDto);
            log.info("Successfully registered a house: {}", register.getRegisteredHouse_id());
            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
            message.setRegisteredHouseId(register.getRegisteredHouse_id());
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (DuplicateMemberException e) {
            String errorMessage = e.getCustomMessage();
            log.error("Error registering a house: {}", e.getMessage(), e);


            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", 409, "success", false, "message", "매물등록에 실패했습니다.", "fieldErrors", List.of()));
        }
    }

    private int extractUserIdFromUserDetails(UserDetails userDetails) {

        String username = userDetails.getUsername();
        try {
            return Integer.parseInt(username);
        } catch (NumberFormatException e) {
            throw new RuntimeException("userId를 찾을 수 없습니다.");
        }
    }

    @GetMapping("/house/{registeredHouseId}")
    public ResponseEntity<?> HouseDetail(@PathVariable int registeredHouseId, @AuthenticationPrincipal UserDetails userDetails,
                                         ModelMap model) {
        RegisteredHouse registeredHouse = registeredHouseRepository.findByRegisteredHouseId(registeredHouseId)
                .orElseThrow(() -> new NotFoundMemberException("Could not found registerdHouse id : " + registeredHouseId));

        RegisteredHouseDto registeredHouseDto = RegisteredHouseDto.from(registeredHouse);
        model.addAttribute("registeredHouse", registeredHouseDto);
        Message message = new Message();

        message.setSuccess(StatusEnum.TRUE);
        message.setIsLiked(StatusEnum.FALSE);
        message.setRegisteredHouseDto(registeredHouseDto);
        if (userDetails == null) {
            log.error("userDetails == null");

            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            String loginEmail = userDetails.getUsername();
            HUser user = userService.findByEmail(loginEmail);

            List<Liked> liked = likedRepository.findAllByUserIdAndRegisteredId(user.getId(), registeredHouseId);

            int liked_Id = 0;
            for (Liked liked1 : liked) {
                liked_Id = liked1.getLike_id();
            }
            log.error("liked_Id : {} ", liked_Id);
            if(liked_Id != 0) {
                log.error("liked is not null");
                message.setIsLiked(StatusEnum.TRUE);
                return new ResponseEntity<>(message, HttpStatus.OK);
            } else {
                log.error("liked is null");
                return new ResponseEntity<>(message, HttpStatus.OK);
            }
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam(value="sgg_nm",required = false) String sggNm,
            @RequestParam(value="house_type",required = false) String houseType,
            @RequestParam(value="obj_amt",required=false) Integer objAmount,
            @RequestParam(value="bldg_area",required=false) Integer bldgArea, ModelMap model ) {
        RegisteredHouseCondition condition = new RegisteredHouseCondition(sggNm, houseType, objAmount, bldgArea);
        log.info("condition : {}", condition);

        List<RegisteredHouse> registeredHouseList = registeredHouseService.search(condition);
        log.info("registeredHouseList : {}", registeredHouseList);

        log.info("sggNm : {}", sggNm);
        log.info("houseType : {}", houseType);
        log.info("objAmount : {}", objAmount);
        log.info("bldgArea : {}", bldgArea);

        ArrayList<RegisteredHouseDto> registeredHouseDtoList = new ArrayList<>();
        for (RegisteredHouse registeredHouse : registeredHouseList) {
            RegisteredHouseDto registeredHouseDto = RegisteredHouseDto.from(registeredHouse);
            registeredHouseDtoList.add(registeredHouseDto);
        }
        log.error("registeredHouseDtoList : {}", registeredHouseDtoList);
        model.addAttribute("registeredHouse", registeredHouseDtoList);

        Message message = new Message();
        message.setSuccess(StatusEnum.TRUE);
        message.setRegisteredHouse(registeredHouseDtoList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
