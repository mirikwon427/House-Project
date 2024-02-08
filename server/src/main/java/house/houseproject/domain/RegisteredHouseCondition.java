package house.houseproject.domain;

import lombok.Data;

@Data
public class RegisteredHouseCondition {
    String sggNm;
    String houseType;
    Integer objAmt;
    Integer bldgArea;

    public RegisteredHouseCondition(String sggNm, String houseType, Integer objAmt, Integer bldgArea) {
        this.sggNm = sggNm;
        this.houseType = houseType;
        this.objAmt = objAmt;
        this.bldgArea = bldgArea;
    }
}
