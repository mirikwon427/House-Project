package house.houseproject.controller;

import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.DeleteHouseDto;
import house.houseproject.dto.LikedDto;
import house.houseproject.dto.UpdateHouseDto;
import house.houseproject.service.UpdateHouseService;
import house.houseproject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class UpdateHouseController {
    private final UpdateHouseService updateHouseService;
    private final UserService userService;
    private final RegisteredHouseRepository registeredHouseRepository;


    @PutMapping("/house/{id}")
    public ResponseEntity<?> updateHouse(@PathVariable int id, @Valid @RequestBody UpdateHouseDto updateHouseDto,
                                         @AuthenticationPrincipal UserDetails userDetails, Model model, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            List<String> errorMessages = errors.stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList();

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("status", 400, "success", false, "message", "값을 확인해주세요.", "fieldErrors", errorMessages));
        }
        String email = userDetails.getUsername();
        HUser user = userService.findByEmail(email);
        int userId = user.getId();
        int registeredHouseId = 0;
        ArrayList<Integer> registeredHouseIds = registeredHouseRepository.findRegisteredHouseIdByUserId(userId);
        for (Integer i : registeredHouseIds) {
            if(i == id) {
                registeredHouseId = i;
                break;
            }
        }
        if (registeredHouseId == id) {
            try {

                updateHouseDto.setRegisteredHouse_id(id);
                updateHouseDto.setUser_id(userId);

                UpdateHouseDto updateHouse = updateHouseService.updateHouse(updateHouseDto);

                model.addAttribute("house", updateHouseDto);

                Message message = new Message();
                message.setSuccess(StatusEnum.TRUE);
                message.setRegisteredHouseId(updateHouseDto.getRegisteredHouse_id());


                return new ResponseEntity<>(message, HttpStatus.OK);


            } catch (NoSuchElementException e) {
                log.error("Error updating house with ID {}: {}", id, e.getMessage(), e);

                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("status", 404, "success", false, "message", "매물을 찾을 수 없습니다.", "fieldErrors", List.of()));
            } catch (Exception e) {
                log.error("Error updating house with ID {}: {}", id, e.getMessage(), e);

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("status", 500, "success", false, "message", "서버 오류", "fieldErrors", List.of()));
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("status", 403, "success", false, "message", "본인이 올린 매물만 수정할 수 있습니다."));
        }
    }

    @DeleteMapping("/house/{id}")
    public ResponseEntity<?> deleteHouse(@PathVariable int id, @AuthenticationPrincipal UserDetails userDetails) {
    try {
        if (userDetails == null) {
            log.error("userDetails == null");
            return new ResponseEntity<>(Map.of("success", false, "message", "로그인 후 삭제 가능합니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        String email = userDetails.getUsername();
        HUser user = userService.findByEmail(email);

        if (user == null) {
            return new ResponseEntity<>(Map.of("success", false, "message", "사용자를 찾을 수 없습니다."), HttpStatus.NOT_FOUND);
        }


        boolean delete = updateHouseService.deleteHouse(user.getId(), id);

        if (delete) {
            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
            message.setMessage("매물이 삭제되었습니다.");

            return new ResponseEntity<>(message, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Map.of("success", false, "message", "삭제할 매물이 없습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } catch (Exception e) {
        log.error("Error deleting house with ID: " + id, e);
        return new ResponseEntity<>(Map.of("success", false, "message", "서버에서 에러가 발생했습니다."), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    }

}
