package house.houseproject.Repository;

import house.houseproject.domain.HUser;
import house.houseproject.domain.Liked;
import house.houseproject.domain.RegisteredHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikedRepository extends JpaRepository<Liked, Integer> {
   Optional<Liked> findByUserAndRegisteredHouse(HUser user, RegisteredHouse registeredHouse);

   List<Liked> findAllByUserId(int userId);
   @Query("SELECT l FROM Liked l WHERE l.user.id = :userId AND l.registeredHouse.registeredHouseId = :registeredHouseId")
   List<Liked> findAllByUserIdAndRegisteredId(@Param("userId") int userId, @Param("registeredHouseId") int registeredHouseId);
}
