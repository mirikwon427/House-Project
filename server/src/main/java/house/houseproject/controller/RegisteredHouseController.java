package house.houseproject.controller;

import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.RegisteredHouseDto;
import house.houseproject.exception.DuplicateMemberException;
import house.houseproject.service.RegisteredHouseService;
import house.houseproject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class RegisteredHouseController {
    private final RegisteredHouseService registeredHouseService;
    private final UserService userService;
    @PostMapping("/house")
    public ResponseEntity<?> registeredHouse(
            @Valid @RequestBody RegisteredHouseDto registeredHouseDto,
            @AuthenticationPrincipal UserDetails userDetails) {

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
            message.setSuccess(StatusEnum.TURE);
            message.setRegisteredHouseId(register.getRegisteredHouse_id());
            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (DuplicateMemberException e) {
            String errorMessage = e.getCustomMessage();
            log.error("Error registering a house: {}", e.getMessage(), e);


            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", 409, "success", false, "message", errorMessage, "fieldErrors", List.of()));
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
}
