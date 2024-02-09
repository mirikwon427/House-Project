package house.houseproject.domain;

import lombok.Data;

import java.util.List;

import java.util.List;

@Data
public class RegisteredHouseCondition {
    List<String> sggNm;
    List<String> houseType;
    Integer objAmt;
    Integer bldgArea;

    public RegisteredHouseCondition(List<String> sggNm, List<String> houseType, Integer objAmt, Integer bldgArea) {
        this.sggNm = sggNm;
        this.houseType = houseType;
        this.objAmt = objAmt;
        this.bldgArea = bldgArea;
    }
}
