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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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
            @RequestParam(value="location",required = false) List<String> sggNm,
            @RequestParam(value="type",required = false) List<String> houseType,
            @RequestParam(value="price1",required=false,defaultValue="0") Integer objAmount1,
            @RequestParam(value="price2",required=false) Integer objAmount2,
            @RequestParam(value="size1",required=false,defaultValue="0") double netLeasableArea1,
            @RequestParam(value="size2",required=false, defaultValue="0") double netLeasableArea2,
            @RequestParam(value="page", required = false, defaultValue = "1") int page, // 요청된 페이지 번호
            ModelMap model) {

        int pageSize = 15; // 한 페이지당 아이템 수

        // 실제 페이지 번호 계산 (0부터 시작)
        int actualPage = page - 1;
        Pageable pageable = PageRequest.of(actualPage, pageSize);

        RegisteredHouseCondition condition = new RegisteredHouseCondition(sggNm, houseType, objAmount1, netLeasableArea1, objAmount2, netLeasableArea2);
        log.info("condition : {}", condition);
        Page<RegisteredHouse> registeredHousePage;
        if ((sggNm == null || sggNm.isEmpty()) &&
                (houseType == null || houseType.isEmpty()) &&
                (objAmount2 == null || objAmount2 == 0) &&
                netLeasableArea2 == 0) {
            registeredHousePage = registeredHouseService.houseList(pageable);
        } else {
            registeredHousePage = registeredHouseService.search(condition, pageable);
        }

        log.info("registeredHouseList : {}", registeredHousePage);

        log.info("sggNm : {}", sggNm);
        log.info("houseType : {}", houseType);
        log.info("objAmount1 : {}", objAmount1);
        log.info("netLeasableArea1 : {}", netLeasableArea1);
        log.info("objAmount2 : {}", objAmount2);
        log.info("netLeasableArea2 : {}", netLeasableArea2);

        ArrayList<RegisteredHouseDto> registeredHouseDtoList = new ArrayList<>();
        for (RegisteredHouse registeredHouse : registeredHousePage) {
            RegisteredHouseDto registeredHouseDto = RegisteredHouseDto.from(registeredHouse);
            registeredHouseDtoList.add(registeredHouseDto);
        }
        if (registeredHouseDtoList.isEmpty()) {
            log.error("registeredHouseDtoList is empty");
            model.addAttribute("registeredHouse", registeredHouseDtoList);

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", 409, "success", false, "message", "해당하는 매물이 없습니다."));
        } else {
            log.error("registeredHouseDtoList : {}", registeredHouseDtoList);
            model.addAttribute("registeredHouse", registeredHouseDtoList);

            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
            message.setRegisteredHouse(registeredHouseDtoList);
            return new ResponseEntity<>(message, HttpStatus.OK);
        }
    }
    @GetMapping("/getHouse")
    public  ResponseEntity<?> house(@AuthenticationPrincipal UserDetails userDetails, ModelMap model) {
        if (userDetails == null) {
            log.error("userDetails == null");
            return new ResponseEntity<>(Map.of("success", false, "message", "로그인 후 조회가 가능합니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        HUser user = userService.findByEmail(userDetails.getUsername());
        ArrayList<Integer> houseIdList = registeredHouseRepository.findRegisteredHouseIdByUserId(user.getId());
        ArrayList<RegisteredHouseDto> registeredHouseDtoList = new ArrayList<>();
        for (Integer registeredHouseId : houseIdList) {
            Optional<RegisteredHouse> registeredHouseOptional = registeredHouseRepository.findByRegisteredHouseId(registeredHouseId);

            registeredHouseOptional.ifPresent(registeredHouse -> {
                RegisteredHouseDto registeredHouseDto = RegisteredHouseDto.from(registeredHouse);
                registeredHouseDtoList.add(registeredHouseDto);
            });
        }
        model.addAttribute("registeredHouse", registeredHouseDtoList); // DTO 리스트도 모델에 추가

        Message message = new Message();
        message.setSuccess(StatusEnum.TRUE);
        message.setRegisteredHouse(registeredHouseDtoList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
