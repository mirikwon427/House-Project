package house.houseproject.Repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.domain.RegisteredHouseCondition;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

import static house.houseproject.domain.QLiked.liked;
import static house.houseproject.domain.QRegisteredHouse.registeredHouse;
import static io.jsonwebtoken.lang.Strings.hasText;

@Slf4j
@Repository
public class RegisteredHouseRepositoryImpl implements RegisteredHouseCustom{
    @Autowired
    private JPAQueryFactory queryFactory;

    @Override
    public Page<RegisteredHouse> findBySearchOption(RegisteredHouseCondition condition, Pageable pageable) {
        log.info("condition.getSsgNm() : {}", condition.getSsgNm());
        log.info("condition.getSupplyArea1() : {}", condition.getSupplyArea1());
        log.info("condition.getSupplyArea2() : {}", condition.getSupplyArea2());
        log.info("condition.getHouseType() : {}", condition.getHouseType());
        log.info("condition.getObjAmt1() : {}", condition.getObjAmt1());
        log.info("condition.getObjAmt2() : {}", condition.getObjAmt2());
        log.info("Executing findBySearchOption...");

        QueryResults<RegisteredHouse> queryResults = queryFactory
                .select(registeredHouse)
                .from(registeredHouse)
                .where(
                        ssgNmContains(condition.getSsgNm()),
                        houseTypeContains(condition.getHouseType()),
                        objAmtInRange(condition.getObjAmt1(), condition.getObjAmt2()),
                        supplyAreaInRange(condition.getSupplyArea1(), condition.getSupplyArea2())
                )
                .orderBy(
                        registeredHouse.registeredHouseId.desc(),
                        registeredHouse.sggNm.asc(),
                        registeredHouse.houseType.asc(),
                        registeredHouse.objAmt.asc(),
                        registeredHouse.supplyArea.asc()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageable, queryResults.getTotal());
    }


    private BooleanExpression ssgNmContains(List<String> ssgNm) {
        if (ssgNm != null && !ssgNm.isEmpty()) {
            BooleanExpression[] expressions = ssgNm.stream()
                    .filter(s -> s != null && !s.isEmpty())
                    .map(s -> registeredHouse.sggNm.like("%" + s + "%")) // 각 문자열에 대해 like 연산 적용
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
                    .map(s -> registeredHouse.houseType.like("%" + s + "%")) // 각 문자열에 대해 like 연산 적용
                    .toArray(BooleanExpression[]::new);
            return Expressions.anyOf(expressions); //
        } else {
            // 빈 리스트를 전달하여 항상 true를 반환하도록 설정
            return null;
        }
    }

    private BooleanExpression objAmtInRange(Integer objAmt1, Integer objAmt2) {
        if (objAmt1 != null && objAmt2 != null && objAmt1 <= objAmt2 && objAmt1 >= 0) {
            return registeredHouse.objAmt.between(10000 * objAmt1, 10000 * objAmt2);
        } else  {
            return null;
        }
    }

    private BooleanExpression supplyAreaInRange(Integer supplyArea1, Integer supplyArea2) {
        if (supplyArea1 != null && supplyArea2 != null && supplyArea1 <= supplyArea2 && supplyArea1 >= 0) {
            return registeredHouse.supplyArea.between(3.31 * supplyArea1, 3.31 * supplyArea2);
        } else {
            return null;
        }
    }

    public String getLikedRegisteredHouseCountBySggNm(int userId) {
        Tuple result =  queryFactory.select( registeredHouse.sggNm, registeredHouse.count())
                .from(registeredHouse)
                .where(registeredHouse.registeredHouseId.in(
                        JPAExpressions.select(liked.registeredHouse.registeredHouseId)
                                .from(liked)
                                .where(liked.user.Id.eq(userId))
                ))
                .groupBy(registeredHouse.sggNm)
                .orderBy(registeredHouse.count().desc())
                .fetchFirst();

        if (result != null) {
            log.info("result.get(registeredHouse.sgg_nm) : {}", result.get(registeredHouse.sggNm));
            return result.get(registeredHouse.sggNm);
        } else {
            return null;
        }
    }
}
