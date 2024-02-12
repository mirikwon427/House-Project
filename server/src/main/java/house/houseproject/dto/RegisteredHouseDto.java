package house.houseproject.dto;

import com.querydsl.core.annotations.QueryProjection;
import house.houseproject.domain.RegisteredHouse;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class RegisteredHouseDto {

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
    private int obj_amt;

    @NotNull
    private int bldg_area;

    @NotNull
    private String tot_area;

    @NotNull
    private String h_floor;

    private String right_gbn;

    private String cntl_ymd;

    @NotNull
    private String build_year;

    @NotNull
    private String house_type;

    @NotNull
    private String req_gbn;

    private String rdealer_lawdnm;



    public static RegisteredHouseDto from(RegisteredHouse registeredHouse) {
        if(registeredHouse == null) return null;

        return RegisteredHouseDto.builder()
                .registeredHouse_id(registeredHouse.getRegisteredHouseId())
                .user_id(registeredHouse.getUser().getId())
                .acc_year(registeredHouse.getAcc_year())
                .sgg_cd(registeredHouse.getSgg_cd())
                .sgg_nm(registeredHouse.getSgg_nm())
                .bjdong_cd(registeredHouse.getBjdong_cd())
                . bjdong_nm(registeredHouse.getBjdong_nm())
                .land_gbm(registeredHouse.getLand_gbm())
                .land_gbn_nm(registeredHouse.getLand_gbn_nm())
                .bonbeon(registeredHouse.getBonbeon())
                .bubeon(registeredHouse.getBubeon())
                .bldg_nm(registeredHouse.getBldg_nm())
                .dal_ymd(registeredHouse.getDal_ymd())
                .obj_amt(registeredHouse.getObj_amt())
                .bldg_area(registeredHouse.getBldg_area())
                .tot_area(registeredHouse.getTot_area())
                .h_floor(registeredHouse.getH_floor())
                .right_gbn(registeredHouse.getRight_gbn())
                .cntl_ymd(registeredHouse.getCntl_ymd())
                .build_year(registeredHouse.getBuild_year())
                .house_type(registeredHouse.getHouse_type())
                .req_gbn(registeredHouse.getReq_gbn())
                .rdealer_lawdnm(registeredHouse.getRdealer_lawdnm())
                .build();
    }

    @QueryProjection
    public RegisteredHouseDto(int registeredHouse_id, int user_id, String acc_year, @NotNull String sgg_cd, @NotNull String sgg_nm, String bjdong_cd, String bjdong_nm, @NotNull String land_gbm, @NotNull String land_gbn_nm, @NotNull String bonbeon, @NotNull String bubeon, @NotNull String bldg_nm, @NotNull String dal_ymd, @NotNull int obj_amt, @NotNull int bldg_area, @NotNull String tot_area, @NotNull String h_floor, String right_gbn, String cntl_ymd, @NotNull String build_year, @NotNull String house_type, @NotNull String req_gbn, String rdealer_lawdnm) {
        this.registeredHouse_id = registeredHouse_id;
        this.user_id = user_id;
        this.acc_year = acc_year;
        this.sgg_cd = sgg_cd;
        this.sgg_nm = sgg_nm;
        this.bjdong_cd = bjdong_cd;
        this.bjdong_nm = bjdong_nm;
        this.land_gbm = land_gbm;
        this.land_gbn_nm = land_gbn_nm;
        this.bonbeon = bonbeon;
        this.bubeon = bubeon;
        this.bldg_nm = bldg_nm;
        this.dal_ymd = dal_ymd;
        this.obj_amt = obj_amt;
        this.bldg_area = bldg_area;
        this.tot_area = tot_area;
        this.h_floor = h_floor;
        this.right_gbn = right_gbn;
        this.cntl_ymd = cntl_ymd;
        this.build_year = build_year;
        this.house_type = house_type;
        this.req_gbn = req_gbn;
        this.rdealer_lawdnm = rdealer_lawdnm;
    }



}