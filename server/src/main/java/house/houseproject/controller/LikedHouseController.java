package house.houseproject.controller;

import house.houseproject.domain.Message;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.LikedDto;
import house.houseproject.exception.DuplicateMemberException;
import house.houseproject.service.LikedService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likeHouse")
public class LikedHouseController {
    private final LikedService likedService;

    @PostMapping
    public ResponseEntity<?> insert(@RequestBody @Valid LikedDto likedDto) throws Exception{
        try {

            likedService.insert(likedDto);
            Message message = new Message();

            message.setSuccess(StatusEnum.TURE);
            message.setMessage("매물이 찜목록에 추가되었습니다.");

            return new ResponseEntity<>(message, HttpStatus.OK);
        } catch (DuplicateMemberException e) {
            String errorMessage = e.getCustomMessage();

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", 409, "success", false, "message", errorMessage, "fieldErrors", List.of()));
        }
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<Message> delete(@RequestBody Map<String, Integer> requestMap) {
        Integer userId = requestMap.get("userId");
        Integer registeredHouseId = requestMap.get("registeredHouseId");
        LikedDto likedDto = new LikedDto();
        likedDto.setUserId(userId);
        likedDto.setRegisteredHouseId(registeredHouseId);
        likedService.delete(likedDto);
        Message message = new Message();

        message.setSuccess(StatusEnum.TURE);
        message.setMessage("매물이 찜목록에서 삭제되었습니다.");

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}

