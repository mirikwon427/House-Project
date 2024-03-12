package house.houseproject.Repository;

import house.houseproject.domain.HotPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotPlaceRepository extends JpaRepository<HotPlace, Integer> {
    @Query("SELECT h.location FROM HotPlace h ORDER BY h.hotPlace_id DESC LIMIT 3")
    List<String> findByLocation();
}
