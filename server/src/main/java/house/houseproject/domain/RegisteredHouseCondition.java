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
    double netLeasableArea1;
    double netLeasableArea2;

    public RegisteredHouseCondition(List<String> ssgNm, List<String> houseType, Integer objAmt1, double netLeasableArea1, Integer objAmt2, double netLeasableArea2) {
        this.ssgNm = ssgNm;
        this.houseType = houseType;
        this.objAmt1 = objAmt1;
        this.objAmt2 = objAmt2;
        this.netLeasableArea1 = netLeasableArea1;
        this.netLeasableArea2 = netLeasableArea2;
    }
}
