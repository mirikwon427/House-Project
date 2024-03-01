package house.houseproject.Repository;

import house.houseproject.domain.RegisteredHouse;
import house.houseproject.domain.RegisteredHouseCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RegisteredHouseCustom {
    Page<RegisteredHouse> findBySearchOption(RegisteredHouseCondition condition, Pageable pageable);

    String getLikedRegisteredHouseCountBySggNm(int userId);
}
