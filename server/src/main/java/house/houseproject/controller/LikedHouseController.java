package house.houseproject.controller;

import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.LikedDto;
import house.houseproject.exception.DuplicateMemberException;
import house.houseproject.service.LikedService;
import house.houseproject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/like/{registeredHouseId}")
public class LikedHouseController {
    private final LikedService likedService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> insert(@PathVariable int registeredHouseId, @AuthenticationPrincipal UserDetails userDetails) throws Exception{
        try {
            if (userDetails == null) {
                log.error("userDetails == null");
                return new ResponseEntity<>(Map.of("success", false, "message", "로그인 후 찜이 가능합니다."), HttpStatus.INTERNAL_SERVER_ERROR);
            }

            String loginEmail = userDetails.getUsername();
            HUser user = userService.findByEmail(loginEmail);

            LikedDto likedDto = new LikedDto(user.getId(), registeredHouseId);

            likedService.insert(likedDto);
            Message message = new Message();

            message.setSuccess(StatusEnum.TRUE);
            message.setMessage("매물이 찜목록에 추가되었습니다.");

            return new ResponseEntity<>(message, HttpStatus.OK);
        }  catch (DuplicateMemberException e) {
            String errorMessage = e.getCustomMessage();

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", 409, "success", false, "message", "이미 찜목록에 매물이 있습니다.", "fieldErrors", List.of()));
        }
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<?> delete(@PathVariable int registeredHouseId, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            log.error("userDetails == null");
            return new ResponseEntity<>(Map.of("success", false, "message", "로그인 후 찜 해제가 가능합니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String loginEmail = userDetails.getUsername();
        HUser user = userService.findByEmail(loginEmail);

        LikedDto likedDto = new LikedDto(user.getId(), registeredHouseId);
        likedService.delete(likedDto);
        Message message = new Message();

        message.setSuccess(StatusEnum.TRUE);
        message.setMessage("매물이 찜목록에서 삭제되었습니다.");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}

