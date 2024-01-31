package house.houseproject.Repository;

import house.houseproject.domain.HUser;
import house.houseproject.domain.Liked;
import house.houseproject.domain.RegisteredHouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikedRepository extends JpaRepository<Liked, Integer> {
   Optional<Liked> findByUserAndRegisteredHouse(HUser user, RegisteredHouse registeredHouse);

   List<Liked> findAllByUserId(int userId);
}
