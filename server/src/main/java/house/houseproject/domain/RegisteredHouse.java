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

    private String direction;
    private String entranceStructure;
    private String numberOfHouseholds;
    private String address;
    private String addressRoad;
    private String managementFee;
    private String sggNm;
    private String bjdongNm;
    private String parkingSpaces;
    private String description;
    private String floor;
    private String totalFloor;
    private String room;
    private String bathroom;
    private double supplyArea;
    private double netLeasableArea;
    private String houseType;
    private int objAmt;
    private String bldgNm;

}
