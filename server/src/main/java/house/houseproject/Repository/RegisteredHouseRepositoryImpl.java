package house.houseproject.Repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
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
                .orderBy(
                        registeredHouse.sgg_nm.asc(),
                        registeredHouse.house_type.asc(),
                        registeredHouse.obj_amt.asc(),
                        registeredHouse.bldg_area.asc()
                )
                .fetch();
    }

    private BooleanExpression ssgNmContains(List<String> ssgNm) {
        if (ssgNm != null && !ssgNm.isEmpty()) {
            BooleanExpression[] expressions = ssgNm.stream()
                    .filter(s -> s != null && !s.isEmpty())
                    .map(s -> registeredHouse.sgg_nm.like("%" + s + "%")) // 각 문자열에 대해 like 연산 적용
                    .toArray(BooleanExpression[]::new);
            return Expressions.anyOf(expressions); //
        } else {
            // 빈 리스트를 전달하여 항상 true를 반환하도록 설정
            return null;
        }
    }

    private BooleanExpression houseTypeContains(List<String> houseType) {
        if (houseType != null && !houseType.isEmpty()) {
            BooleanExpression[] expressions = houseType.stream()
                    .filter(s -> s != null && !s.isEmpty())
                    .map(s -> registeredHouse.house_type.like("%" + s + "%")) // 각 문자열에 대해 like 연산 적용
                    .toArray(BooleanExpression[]::new);
            return Expressions.anyOf(expressions); //
        } else {
            // 빈 리스트를 전달하여 항상 true를 반환하도록 설정
            return null;
        }
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
