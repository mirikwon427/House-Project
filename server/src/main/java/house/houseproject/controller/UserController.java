package house.houseproject.controller;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Message;
import house.houseproject.domain.StatusEnum;
import house.houseproject.dto.LoginDto;
import house.houseproject.dto.UserDto;
import house.houseproject.exception.DuplicateMemberException;
import house.houseproject.service.FlaskService;
import house.houseproject.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;
    private final FlaskService flaskService;
    public UserController(UserService userService, FlaskService flaskService) {
        this.userService = userService;
        this.flaskService = flaskService;
    }
    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("hello");
    }
    @PostMapping("/test-redirect")
    public void testRedirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/api/user");
    }
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserDto userDto, BindingResult bindingResult) {

            if (bindingResult.hasErrors()) {
                List<ObjectError> errors = bindingResult.getAllErrors();
                for (ObjectError error : errors) {
                    log.error("Validation Error: {}", error.getDefaultMessage());
                }
              //  return new ResponseEntity<>("모든 값을 입력해주세요.", HttpStatus.BAD_REQUEST);
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("status", 404, "success", false, "message", "모든값을 입력해주세요.", "fieldErrors", List.of()));
            }

        try {

            UserDto createdUser = userService.signup(userDto);

            HUser loginUser = userService.findByEmail(createdUser.getEmail());

            LoginDto loginResponse = new LoginDto(createdUser.getId(),createdUser.getEmail(),createdUser.getName(),
                    createdUser.getAge(), createdUser.getPhone(), createdUser.getAddress());

            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
            message.setUser(loginResponse);
            return new ResponseEntity<>(message, HttpStatus.OK);



        } catch (DuplicateMemberException e) {
            String errorMessage = e.getCustomMessage();

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("status", 409, "success", false, "message", errorMessage, "fieldErrors", List.of()));
        }
    }
    @PostMapping("/sendOTP")
    public ResponseEntity<?> sendOtp(@Valid @RequestBody String phonNum) {

        Map<String, Object> status = flaskService.sendToPhonNum(phonNum);
        log.info(status.toString());
        if(status.get("error") != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("success", false, "error", status.get("error")));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(Map.of("success", "TRUE", "status", status.get("status")));
    }
    @PostMapping("/checkOTP")
    public ResponseEntity<?> checkOTP(@Valid @RequestBody Map<String, Object> body) {
        log.info("optCode : " + body);
        Map<String, Object> status = flaskService.checkOTP(body);
        log.info("status"+status.toString());
        if(status.get("error") != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("success", false, "error", status.get("error")));
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(Map.of("success", "TRUE", "status", status.get("status")));

    }
    /**
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<UserDto> getMyUserInfo(HttpServletRequest request) {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities());
    }

    @GetMapping("/user/{email}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<UserDto> getUserInfo(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(email));
    }
    **/
}
