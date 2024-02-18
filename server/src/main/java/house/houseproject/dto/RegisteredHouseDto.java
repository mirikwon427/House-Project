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

    public static RegisteredHouseDto from(RegisteredHouse registeredHouse) {
        if(registeredHouse == null) return null;

        return RegisteredHouseDto.builder()
                .registeredHouse_id(registeredHouse.getRegisteredHouseId())
                .user_id(registeredHouse.getUser().getId())
                .direction(registeredHouse.getDirection())
                .entranceStructure(registeredHouse.getEntranceStructure())
                .numberOfHouseholds(registeredHouse.getNumberOfHouseholds())
                .address(registeredHouse.getAddress())
                .addressRoad(registeredHouse.getAddressRoad())
                .managementFee(registeredHouse.getManagementFee())
                .sggNm(registeredHouse.getSggNm())
                .bjdongNm(registeredHouse.getBjdongNm())
                .parkingSpaces(registeredHouse.getParkingSpaces())
                .description(registeredHouse.getDescription())
                .floor(registeredHouse.getFloor())
                .totalFloor(registeredHouse.getTotalFloor())
                .room(registeredHouse.getRoom())
                .bathroom(registeredHouse.getBathroom())
                .supplyArea(registeredHouse.getSupplyArea())
                .netLeasableArea(registeredHouse.getNetLeasableArea())
                .houseType(registeredHouse.getHouseType())
                .objAmt(registeredHouse.getObjAmt())
                .bldgNm(registeredHouse.getBldgNm())
                .build();
    }
    @QueryProjection
    public RegisteredHouseDto(int registeredHouse_id, int user_id, String direction, String entranceStructure, String numberOfHouseholds, String address, String addressRoad, String managementFee, String sggNm, String bjdongNm, String parkingSpaces, String description, String floor, String totalFloor, String room, String bathroom, int supplyArea, String netLeasableArea, String houseType, int objAmt, String bldgNm) {
        this.registeredHouse_id = registeredHouse_id;
        this.user_id = user_id;
        this.direction = direction;
        this.entranceStructure = entranceStructure;
        this.numberOfHouseholds = numberOfHouseholds;
        this.address = address;
        this.addressRoad = addressRoad;
        this.managementFee = managementFee;
        this.sggNm = sggNm;
        this.bjdongNm = bjdongNm;
        this.parkingSpaces = parkingSpaces;
        this.description = description;
        this.floor = floor;
        this.totalFloor = totalFloor;
        this.room = room;
        this.bathroom = bathroom;
        this.supplyArea = supplyArea;
        this.netLeasableArea = netLeasableArea;
        this.houseType = houseType;
        this.objAmt = objAmt;
        this.bldgNm = bldgNm;
    }



}