package house.houseproject.service;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.HUser;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.domain.RegisteredHouseCondition;
import house.houseproject.dto.RegisteredHouseDto;
import house.houseproject.exception.DuplicateMemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Slf4j
@Service
public class RegisteredHouseService {
    private final RegisteredHouseRepository registeredHouseRepository;
    private final HUserRepository userRepository;

    public RegisteredHouseService(RegisteredHouseRepository registeredHouseRepository,HUserRepository userRepository) {
        this.registeredHouseRepository = registeredHouseRepository;
        this.userRepository = userRepository;
    }

    public boolean existsByRegisteredHouseIdAndUserId(int registeredHouseId, int userId) {
        return registeredHouseRepository.existsByRegisteredHouseIdAndUserId(registeredHouseId, userId);
    }
    @Transactional
    public RegisteredHouseDto registeredHouse(RegisteredHouseDto registeredHouseDto) throws DuplicateMemberException {
        if (existsByRegisteredHouseIdAndUserId(registeredHouseDto.getRegisteredHouse_id(), registeredHouseDto.getUser_id())) {
            throw new DuplicateMemberException("false", "이미 등록된 매물입니다.");
        }
        HUser user = userRepository.findById(registeredHouseDto.getUser_id())
                .orElseThrow(() -> new RuntimeException("사용자가 없습니다."));


        RegisteredHouse registeredHouse = RegisteredHouse.builder()
                .user(user)
                .direction(registeredHouseDto.getDirection())
                .entranceStructure(registeredHouseDto.getEntranceStructure())
                .numberOfHouseholds(registeredHouseDto.getNumberOfHouseholds())
                .address(registeredHouseDto.getAddress())
                .addressRoad(registeredHouseDto.getAddressRoad())
                .managementFee(registeredHouseDto.getManagementFee())
                .sggNm(registeredHouseDto.getSggNm())
                .bjdongNm(registeredHouseDto.getBjdongNm())
                .parkingSpaces(registeredHouseDto.getParkingSpaces())
                .description(registeredHouseDto.getDescription())
                .floor(registeredHouseDto.getFloor())
                .totalFloor(registeredHouseDto.getTotalFloor())
                .room(registeredHouseDto.getRoom())
                .bathroom(registeredHouseDto.getBathroom())
                .supplyArea(registeredHouseDto.getSupplyArea())
                .netLeasableArea(registeredHouseDto.getNetLeasableArea())
                .houseType(registeredHouseDto.getHouseType())
                .objAmt(registeredHouseDto.getObjAmt())
                .bldgNm(registeredHouseDto.getBldgNm())
                .build();

        return RegisteredHouseDto.from(registeredHouseRepository.save(registeredHouse));
    }

    @Transactional
    public Page<RegisteredHouse> search(RegisteredHouseCondition condition, Pageable pageable) {
        log.info("condition : {}", condition);
        Page<RegisteredHouse> registeredHousesList =
                registeredHouseRepository.findBySearchOption(condition, pageable);

        log.info("registeredHousesList : {}",registeredHousesList);
        return registeredHousesList;
    }

    @Transactional
    public Page<RegisteredHouse> houseList(Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("registeredHouseId").descending());
        Page<RegisteredHouse> registeredHousesList =
                registeredHouseRepository.findAll(sortedPageable);

        log.info("registeredHousesList : {}",registeredHousesList);
        return registeredHousesList;
    }
}
