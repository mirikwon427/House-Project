package house.houseproject.controller;
import house.houseproject.Repository.LikedRepository;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Liked;
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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/api/mypage")
@RestController
@RequiredArgsConstructor
public class MypageController{

    private final MypageService mypageService;
    private final UserService userService;
    private final LikedRepository likedRepository;

    @GetMapping("/update")
    public String userUpdate(@AuthenticationPrincipal UserDetails userDetails, ModelMap model) {
        String loginEmail = userDetails.getUsername();

        HUser user = userService.findByEmail(loginEmail);

        model.addAttribute("user", user);
        log.info("User email: {}", user.getEmail());
        return "/update";
    }

    @PostMapping(value = "/update")
    public ResponseEntity<String> updateMember(@Valid @RequestBody UserUpdateDto userUpdateDto, Model model) {

        model.addAttribute("user", userUpdateDto);
        log.info("123");
        log.info("User email: {}", userUpdateDto.getEmail());
        mypageService.userUpdate(userUpdateDto);

               return ResponseEntity.ok("hello");
    }

    @GetMapping("/liked/{id}")
    public  String likedHouse(@PathVariable int id, ModelMap model) {
        List<Liked> likedList = likedRepository.findAllByUserId(id);

        model.addAttribute("likedList", likedList);

        log.info("likedList : {}", likedList);
        return "/liked/{id}";
    }

}
