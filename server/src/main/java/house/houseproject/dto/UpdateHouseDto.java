package house.houseproject.dto;

import house.houseproject.domain.RegisteredHouse;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateHouseDto {

    private int registeredHouse_id;

    private int user_id;


    private String acc_year;

    @NotNull
    private String sgg_cd;

    @NotNull
    private String sgg_nm;

    private String bjdong_cd;

    private String bjdong_nm;

    @NotNull
    private String land_gbm;

    @NotNull
    private String land_gbn_nm;

    @NotNull
    private String bonbeon;

    @NotNull
    private String bubeon;

    @NotNull
    private String bldg_nm;

    @NotNull
    private String dal_ymd;

    @NotNull
    private String obj_amt;

    @NotNull
    private String bldg_area;

    @NotNull
    private String tot_area;

    @NotNull
    private String h_floor;

    private String right_gbn;

    private String cntl_ymd;

    @NotNull
    private String build_year;

    @NotNull
    private String hous_type;

    @NotNull
    private String req_gbn;

    private String rdealer_lawdnm;
}
