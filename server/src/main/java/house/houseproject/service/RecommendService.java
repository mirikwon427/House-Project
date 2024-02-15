package house.houseproject.service;

import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.RegisteredHouse;
import lombok.extern.slf4j.Slf4j;


import java.util.regex.Matcher;
import java.util.regex.Pattern;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class RecommendService {

    // 조회 목록 제한

    private final RegisteredHouseRepository registeredHouseRepository;

    public RecommendService(RegisteredHouseRepository registeredHouseRepository) {
        this.registeredHouseRepository = registeredHouseRepository;

    }

    public List<RegisteredHouse> findLikes() {

        List<RegisteredHouse> list = null;

        return list;
    }

    public Page<RegisteredHouse> findUserAddress(String userAddress, Pageable pageable) {

        String extracted = ""; //

        // 정규 표현식을 "시"와 "구" 사이의 문자열 및 "구"를 포함
        Pattern pattern = Pattern.compile("시 (.+?구)");
        Matcher matcher = pattern.matcher(userAddress);

        //매칭된 문자열이 있으면 변수에 저장
        if (matcher.find()) {
            extracted = matcher.group(1);
            log.info(" extracted : {}",extracted); // 체크
        } else {
            log.info("체크된 문자열이 없네요..."); // 체크
        }

        // 변수에 저장된 문자열 출력
        log.info("추출된 구 이름 : {} ", extracted);


        return registeredHouseRepository.findBySggNm(extracted,pageable);

    }



}