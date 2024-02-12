package house.houseproject.Repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.domain.RegisteredHouseCondition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static house.houseproject.domain.QRegisteredHouse.registeredHouse;
import static io.jsonwebtoken.lang.Strings.hasText;

@Slf4j
@Repository
public class RegisteredHouseRepositoryImpl implements RegisteredHouseCustom{
    @Autowired
    private JPAQueryFactory queryFactory;

    @Override
    public List<RegisteredHouse> findBySearchOption(RegisteredHouseCondition condition) {
        log.info("condition.getSggNm() : {}", condition.getSggNm());
        log.info("condition.getBldgArea() : {}", condition.getBldgArea());
        log.info("condition.getHouseType() : {}", condition.getHouseType());
        log.info("condition.getObjAmt() : {}", condition.getObjAmt());

        return queryFactory
                .select(registeredHouse)
                .from(registeredHouse)
                .where(
                        ssgNmContains(condition.getSggNm()),
                        houseTypeContains(condition.getHouseType()),
                        objAmtContains(condition.getObjAmt()),
                        bldgAreaLoe(condition.getBldgArea())
                )
                .fetch();
    }

    private BooleanExpression ssgNmContains(String ssgNm) {
        return hasText(ssgNm) ? registeredHouse.sgg_nm.contains(ssgNm) : null;
    }

    private BooleanExpression houseTypeContains(String houseType) {
        return hasText(houseType) ? registeredHouse.house_type.contains(houseType) : null;
    }

    private BooleanExpression objAmtContains(Integer objAmt) {
        if (objAmt != null && objAmt > 0) {
            return registeredHouse.obj_amt.loe(10000 * objAmt);
        } else  {
            return null;
        }
    }

    private BooleanExpression bldgAreaLoe(Integer bldgArea) {
        if (bldgArea != null && bldgArea > 0) {
            return registeredHouse.bldg_area.loe(3.31 * bldgArea);
        } else {
            return null;
        }
    }
}
