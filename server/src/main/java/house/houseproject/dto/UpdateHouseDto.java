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

    @NotNull
    private String direction;
    @NotNull
    private String entranceStructure;
    @NotNull
    private String numberOfHouseholds;
    @NotNull
    private String address;
    @NotNull
    private String addressRoad;
    @NotNull
    private String managementFee;
    @NotNull
    private String sggNm;
    @NotNull
    private String bjdongNm;
    @NotNull
    private String parkingSpaces;
    @NotNull
    private String description;
    @NotNull
    private String floor;
    @NotNull
    private String totalFloor;
    @NotNull
    private String room;
    @NotNull
    private String bathroom;
    @NotNull
    private int supplyArea;
    @NotNull
    private String netLeasableArea;
    @NotNull
    private String houseType;
    @NotNull
    private int objAmt;
    @NotNull
    private String bldgNm;
}
