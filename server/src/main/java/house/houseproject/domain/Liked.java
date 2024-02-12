package house.houseproject.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Liked {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int like_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private HUser user;

    @ManyToOne
    @JoinColumn(name = "registeredHouse_id")
    private RegisteredHouse registeredHouse;

}
