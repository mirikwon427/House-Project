package house.houseproject.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommendDto {

    private int registeredHouse_id;

    private String address;
}