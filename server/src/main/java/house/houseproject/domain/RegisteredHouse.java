package house.houseproject.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisteredHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registeredHouseId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private HUser user;

    private String acc_year;
    private String sgg_cd;
    private String sgg_nm;
    private String bjdong_cd;
    private String bjdong_nm;
    private String land_gbm;
    private String land_gbn_nm;
    private String bonbeon;
    private String bubeon;
    private String bldg_nm;
    private String dal_ymd;
    private int obj_amt;
    private int bldg_area;
    private String tot_area;
    private String h_floor;
    private String right_gbn;
    private String cntl_ymd;
    private String build_year;
    private String house_type;
    private String req_gbn;
    private String rdealer_lawdnm;

}
