package house.houseproject.controller;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.UserDto;
import house.houseproject.dto.UserUpdateDto;
import house.houseproject.service.MypageService;
import house.houseproject.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/mypage")
@RestController
@RequiredArgsConstructor
public class MypageController{

    private final MypageService mypageService;
    private final UserService userService;

    @GetMapping("/update")
    public String userUpdate(@AuthenticationPrincipal UserDetails userDetails, ModelMap model) {
        String loginEmail = userDetails.getUsername();

        HUser user = userService.findByEmail(loginEmail);

        model.addAttribute("user", user);
        log.info("User email: {}", user.getEmail());

        return "/update";
    }



        @PostMapping(value = "/update")
        public ResponseEntity<?> updateMember(@Valid @RequestBody UserUpdateDto userUpdateDto, Model model) {

        try {

            mypageService.userUpdate(userUpdateDto);
            HUser update = userService.findByEmail(userUpdateDto.getEmail());

            model.addAttribute("user", userUpdateDto);
            UserUpdateDto user = new UserUpdateDto(update.getEmail(),update.getPassword(),update.getName(),update.getAge()
            ,update.getPhone(),update.getAddress());


            Message message = new Message("Success", user, "null");
            return ResponseEntity.ok(message);
        } catch(Exception e) {
           Message message = new Message("failed", null, "Bad Request");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
        }


        }



    }
