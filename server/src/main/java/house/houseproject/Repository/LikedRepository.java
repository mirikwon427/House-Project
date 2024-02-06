package house.houseproject.Repository;

import house.houseproject.domain.HUser;
import house.houseproject.domain.Liked;
import house.houseproject.domain.RegisteredHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface LikedRepository extends JpaRepository<Liked, Integer> {
   Optional<Liked> findByUserAndRegisteredHouse(HUser user, RegisteredHouse registeredHouse);

   @Query("SELECT l.registeredHouse.registeredHouseId FROM Liked l WHERE l.user.id = :userId")
   ArrayList<Integer> findRegisteredHouseIdsByUserId(@Param("userId") int userId);
}
