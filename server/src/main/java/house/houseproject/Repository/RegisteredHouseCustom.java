package house.houseproject.Repository;

import house.houseproject.domain.RegisteredHouse;
import house.houseproject.domain.RegisteredHouseCondition;

import java.util.List;

public interface RegisteredHouseCustom {
    List<RegisteredHouse> findBySearchOption(RegisteredHouseCondition condition);
}
