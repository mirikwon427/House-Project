package house.houseproject.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import house.houseproject.dto.RegisteredHouseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class FlaskService {

    //데이터를 JSON 객체로 변환하기 위해서 사용
    private final ObjectMapper objectMapper;
    @Transactional
    public Map<String, Object> sendToFlask(RegisteredHouseDto registeredHouseDto) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String param = objectMapper.writeValueAsString(registeredHouseDto);
            HttpEntity<String> entity = new HttpEntity<String>(param, headers);

            String url = "http://localhost:5000/api/futurePrice";
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            Map<String, Object> responseMap =  objectMapper.readValue(response.getBody(), new TypeReference<Map<String, Object>>() {});

            return responseMap;
        } catch (JsonProcessingException e) {
            // JSON 변환 오류가 발생하면 로그를 남기고 null 반환
            log.error("Error while processing JSON: {}", e.getMessage());
            return null;
        } catch (Exception e) {
            // 다른 예외가 발생하면 로그를 남기고 null 반환
            log.error("Error while sending request to Flask: {}", e.getMessage());
            return null;
        }
    }
}
