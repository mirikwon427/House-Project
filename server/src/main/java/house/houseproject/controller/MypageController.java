package house.houseproject.controller;
import house.houseproject.Repository.LikedRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.*;

import house.houseproject.dto.RegisteredHouseDto;
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

import java.util.ArrayList;
import java.util.List;

import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class MypageController{

    private final MypageService mypageService;
    private final UserService userService;
    private final LikedRepository likedRepository;
    private final RegisteredHouseRepository registeredHouseRepository;

    @GetMapping("/user/{id}")
    public String userUpdate(@AuthenticationPrincipal UserDetails userDetails, ModelMap model) {
        String loginEmail = userDetails.getUsername();

        HUser user = userService.findByEmail(loginEmail);

        model.addAttribute("user", user);
        log.info("User email: {}", user.getEmail());

        return "/user";
    }

        @PutMapping(value = "/user/{id}")
        public ResponseEntity<?> updateMember(@PathVariable Integer id,
                                              @Valid @RequestBody UserUpdateDto userUpdateDto, Model model, BindingResult bindingResult) {


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


            HUser update = userService.findById(id);

            UserUpdateDto user = new UserUpdateDto(userUpdateDto.getId(),userUpdateDto.getEmail(), userUpdateDto.getPassword(), userUpdateDto.getName(), userUpdateDto.getAge()
            ,userUpdateDto.getPhone(), userUpdateDto.getAddress());
            mypageService.userUpdate(user);
            model.addAttribute("user", user);
            Message message = new Message();
            message.setSuccess(StatusEnum.TRUE);
            message.setUser(user);


            return new ResponseEntity<>(message,HttpStatus.OK);

        } catch(Exception e) {
            log.error("update failed: {}", e.getMessage());
            return new ResponseEntity<>(Map.of("success", false, "message", "Unexpected error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }


        



    }

    @GetMapping("/liked/{id}")
    public ResponseEntity<?> likedHouse(@PathVariable int id, @AuthenticationPrincipal UserDetails userDetails, ModelMap model) {
        if (userDetails == null) {
            log.error("userDetails == null");
            return new ResponseEntity<>(Map.of("success", false, "message", "로그인 후 조회가 가능합니다."), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        ArrayList<Integer> registeredHouseIdList = likedRepository.findRegisteredHouseIdsByUserId(id);
        ArrayList<RegisteredHouseDto> registeredHouseDtoList = new ArrayList<>();
        for (Integer registeredHouseId : registeredHouseIdList) {
            Optional<RegisteredHouse> registeredHouseOptional = registeredHouseRepository.findByRegisteredHouseId(registeredHouseId);

            registeredHouseOptional.ifPresent(registeredHouse -> {
                RegisteredHouseDto registeredHouseDto = RegisteredHouseDto.from(registeredHouse);
                registeredHouseDtoList.add(registeredHouseDto);
            });
        }

        model.addAttribute("registeredHouse", registeredHouseDtoList);

        Message message = new Message();
        message.setSuccess(StatusEnum.TRUE);
        message.setRegisteredHouse(registeredHouseDtoList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}

