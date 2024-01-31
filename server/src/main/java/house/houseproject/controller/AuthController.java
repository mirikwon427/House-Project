package house.houseproject.controller;
import house.houseproject.domain.HUser;
import house.houseproject.dto.LoginDto;
import house.houseproject.dto.TokenDto;
import house.houseproject.jwt.JwtFilter;
import house.houseproject.jwt.TokenProvider;
import house.houseproject.service.HUserDetailsService;
import house.houseproject.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final UserService userService;
    private final HUserDetailsService userDetailsService;

    public AuthController(
            TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder,UserService userService, HUserDetailsService userDetailsService) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userService = userService;
        this.userDetailsService = userDetailsService;
    }

    class ErrorResponse {
        private final String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authorize(@Valid @RequestBody LoginDto loginDto, BindingResult bindingResult) {
        log.info("Received login request for email: {}", loginDto.getEmail());
        log.info("Received login request for password: {}", loginDto.getPassword());

        // 유효성 검사 에러가 있는 경우
        if (bindingResult.hasErrors()) {
            List<ObjectError> errors = bindingResult.getAllErrors();
            for (ObjectError error : errors) {
                log.error("Validation Error: {}", error.getDefaultMessage());
            }
            return new ResponseEntity<>(new ErrorResponse("Validation failed"), HttpStatus.BAD_REQUEST);
        }

        try {
            // 로그인 성공 시
            UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.createToken(authentication);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

            HUser loginUser = userService.findByEmail(loginDto.getEmail());

            TokenDto loginResponse = new TokenDto(jwt, loginUser.getId(), loginUser.getEmail(), loginUser.getName(),
                    loginUser.getAge(), loginUser.getPhone(), loginUser.getAddress());

            return new ResponseEntity<>(loginResponse, httpHeaders, HttpStatus.OK);

        } catch (BadCredentialsException e) {
            // 비밀번호가 틀렸을 때
            log.error("Invalid password for email: {}", loginDto.getEmail());
            return new ResponseEntity<>(Map.of("success", false, "message", "아이디 또는 비밀번호를 잘못 입력했습니다."), HttpStatus.UNAUTHORIZED);

        } catch (UsernameNotFoundException e) {
            // 이메일이 틀렸을 때
            log.error("Email not found: {}", loginDto.getEmail());
            return new ResponseEntity<>(Map.of("success", false, "message", "아이디 또는 비밀번호를 잘못 입력했습니다."), HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            // 그 외의 로그인 실패
            log.error("Login failed: {}", e.getMessage());
            return new ResponseEntity<>(Map.of("success", false, "message", "Unexpected error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
