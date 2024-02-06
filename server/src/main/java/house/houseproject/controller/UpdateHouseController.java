package house.houseproject.controller;

import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.StatusEnum;
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

        try {

                String email = userDetails.getUsername();
                HUser user = userService.findByEmail(email);
                int userId = user.getId();

            updateHouseDto.setRegisteredHouse_id(id);
            updateHouseDto.setUser_id(userId);

            UpdateHouseDto updateHouse = updateHouseService.updateHouse(updateHouseDto);

            model.addAttribute("house", updateHouseDto);

            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
          //  message.setUser(house); // id


            return new ResponseEntity<>(message,HttpStatus.OK);


        } catch (NoSuchElementException e) {
            log.error("Error updating house with ID {}: {}",id, e.getMessage(), e);

            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("status", 404, "success", false, "message", "House not found", "fieldErrors", List.of()));
        } catch (Exception e) {
            log.error("Error updating house with ID {}: {}", id, e.getMessage(), e);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("status", 500, "success", false, "message", "Internal server error", "fieldErrors", List.of()));
        }
    }
}
