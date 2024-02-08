package house.houseproject.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class DeleteHouseDto {

        private int userId;
        private int registeredHouseId;

        public DeleteHouseDto(int userId, int registeredHouseId) {
            this.userId = userId;
            this.registeredHouseId = registeredHouseId;
        }

}
