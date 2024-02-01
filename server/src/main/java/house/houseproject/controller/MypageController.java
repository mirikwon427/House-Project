package house.houseproject.controller;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.LoginDto;
import org.springframework.http.HttpStatus;
import house.houseproject.dto.UserUpdateDto;
import house.houseproject.service.MypageService;
import house.houseproject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class MypageController{

    private final MypageService mypageService;
    private final UserService userService;

    @GetMapping("/user/{id}")
    public String userUpdate(@AuthenticationPrincipal UserDetails userDetails, ModelMap model) {
        String loginEmail = userDetails.getUsername();

        HUser user = userService.findByEmail(loginEmail);

        model.addAttribute("user", user);
        log.info("User email: {}", user.getEmail());

        return "/user";
    }

        @PutMapping(value = "/user/{id}")
        public ResponseEntity<?> updateMember(@PathVariable Integer id, @Valid @RequestBody UserUpdateDto userUpdateDto, Model model, BindingResult bindingResult) {


            log.info("if 문 밖");
            if (bindingResult.hasErrors()) {
                List<ObjectError> errors = bindingResult.getAllErrors();
                List<String> errorMessages = errors.stream()
                        .map(error -> error.getDefaultMessage())
                        .collect(Collectors.toList());

                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("status", 400, "success", false, "message", "값을 확인해주세요.", "fieldErrors", errorMessages));
            }

        try {

            mypageService.userUpdate(userUpdateDto);
            HUser update = userService.findById(id);

            model.addAttribute("user", userUpdateDto);
             UserUpdateDto user = new UserUpdateDto(update.getEmail(), update.getPassword(), update.getName(), update.getAge()
            ,update.getPhone(), update.getAddress());

            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
            message.setUser(user);


            return new ResponseEntity<>(message,HttpStatus.OK);

        } catch(Exception e) {
            log.error("update failed: {}", e.getMessage());
            return new ResponseEntity<>(Map.of("success", false, "message", "Unexpected error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }


        }



    }
