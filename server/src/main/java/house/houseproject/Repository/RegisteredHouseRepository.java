package house.houseproject.Repository;

import house.houseproject.domain.HUser;
import house.houseproject.domain.Liked;
import house.houseproject.domain.RegisteredHouse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.ArrayList;

@Repository
public interface RegisteredHouseRepository extends JpaRepository<RegisteredHouse, Integer>, RegisteredHouseCustom {
    Optional<RegisteredHouse> findByRegisteredHouseId(int registeredHouseId);

    boolean existsByRegisteredHouseIdAndUserId(int registeredHouseId, int userId);

    @Query("SELECT rh FROM RegisteredHouse rh WHERE rh.sggNm = :sggNm")
    Page<RegisteredHouse> findBySggNm(String sggNm, Pageable pageable);

    @Query("SELECT rh.registeredHouseId FROM RegisteredHouse rh WHERE rh.user.id = :userId")
    ArrayList<Integer> findRegisteredHouseIdByUserId(@Param("userId") int userId);
}
