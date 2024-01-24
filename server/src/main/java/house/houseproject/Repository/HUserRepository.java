package house.houseproject.Repository;

import house.houseproject.domain.HUser;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HUserRepository extends JpaRepository<HUser, Long> {
    //@EntityGraph(attributePaths = "authorities")
    Optional<HUser> findOneWithAuthoritiesByEmail(String email);
}
