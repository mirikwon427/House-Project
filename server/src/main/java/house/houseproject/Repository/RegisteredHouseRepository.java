package house.houseproject.Repository;

import house.houseproject.domain.RegisteredHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegisteredHouseRepository extends JpaRepository<RegisteredHouse, Integer> {
    Optional<RegisteredHouse> findByRegisteredHouseId(int registeredHouseId);
}
