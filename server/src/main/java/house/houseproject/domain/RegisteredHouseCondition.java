package house.houseproject.domain;

import lombok.Data;

import java.util.List;

import java.util.List;

@Data
public class RegisteredHouseCondition {
    List<String> ssgNm;
    List<String> houseType;
    Integer objAmt1;
    Integer objAmt2;
    Integer supplyArea1;
    Integer supplyArea2;

    public RegisteredHouseCondition(List<String> ssgNm, List<String> houseType, Integer objAmt1, Integer supplyArea1, Integer objAmt2, Integer supplyArea2) {
        this.ssgNm = ssgNm;
        this.houseType = houseType;
        this.objAmt1 = objAmt1;
        this.objAmt2 = objAmt2;
        this.supplyArea1 = supplyArea1;
        this.supplyArea2 = supplyArea2;
    }
}
