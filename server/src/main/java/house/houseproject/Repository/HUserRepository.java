package house.houseproject.Repository;

import house.houseproject.domain.HUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// long - > integer
public interface HUserRepository extends JpaRepository<HUser, java.lang.Integer> {
    //@EntityGraph(attributePaths = "authorities")
    Optional<HUser> findOneWithAuthoritiesByEmail(String email);
    HUser findByEmail(String email);
    Optional<HUser> findById(Integer Id);
}
