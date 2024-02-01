package house.houseproject.dto;

import house.houseproject.domain.RegisteredHouse;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
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
                .hous_type(registeredHouse.getHous_type())
                .req_gbn(registeredHouse.getReq_gbn())
                .rdealer_lawdnm(registeredHouse.getRdealer_lawdnm())
                .build();
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getUser_id() {
        return user_id;
    }



}