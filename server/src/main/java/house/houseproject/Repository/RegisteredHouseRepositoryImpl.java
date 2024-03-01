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
        log.info("condition.getSsgNm() : {}", condition.getSggNm());
        log.info("condition.getNetLeasableArea1() : {}", condition.getNetLeasableArea1());
        log.info("condition.getNetLeasableArea2() : {}", condition.getNetLeasableArea2());
        log.info("condition.getHouseType() : {}", condition.getHouseType());
        log.info("condition.getObjAmt1() : {}", condition.getObjAmt1());
        log.info("condition.getObjAmt2() : {}", condition.getObjAmt2());
        log.info("Executing findBySearchOption...");

        QueryResults<RegisteredHouse> queryResults = queryFactory
                .select(registeredHouse)
                .from(registeredHouse)
                .where(
                        sggNmContains(condition.getSggNm()),
                        houseTypeContains(condition.getHouseType()),
                        objAmtInRange(condition.getObjAmt1(), condition.getObjAmt2()),
                        netLeasableAreaInRange(condition.getNetLeasableArea1(), condition.getNetLeasableArea2())
                )
                .orderBy(
                        registeredHouse.registeredHouseId.desc(),
                        registeredHouse.sggNm.asc(),
                        registeredHouse.houseType.asc(),
                        registeredHouse.objAmt.asc(),
                        registeredHouse.netLeasableArea.asc()
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageable, queryResults.getTotal());
    }


    private BooleanExpression sggNmContains(List<String> sggNm) {
        if (sggNm != null && !sggNm.isEmpty()) {
            System.out.println("111111111111"+sggNm);
            BooleanExpression[] expressions = sggNm.stream()
                    .filter(s -> s != null && !s.isEmpty())
                    .map(s -> registeredHouse.sggNm.like("%" + s + "%"))
                    .toArray(BooleanExpression[]::new);
            return Expressions.anyOf(expressions);
        } else {
            // 빈 리스트를 전달하여 항상 true를 반환하도록 설정
            System.out.println("222222222222"+sggNm);
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

    private BooleanExpression netLeasableAreaInRange(double netLeasableArea1, double netLeasableArea2) {
        if (netLeasableArea1 <= netLeasableArea2 && netLeasableArea1 >= 0 && netLeasableArea2 != 0.0) {
            return registeredHouse.netLeasableArea.between(3.31 * netLeasableArea1, 3.31 * netLeasableArea2);
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
