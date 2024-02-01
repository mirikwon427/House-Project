package house.houseproject.service;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.HUser;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.dto.RegisteredHouseDto;
import house.houseproject.exception.DuplicateMemberException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
                .acc_year(registeredHouseDto.getAcc_year())
                .sgg_cd(registeredHouseDto.getSgg_cd())
                .sgg_nm(registeredHouseDto.getSgg_nm())
                .bjdong_cd(registeredHouseDto.getBjdong_cd())
                . bjdong_nm(registeredHouseDto.getBjdong_nm())
                .land_gbm(registeredHouseDto.getLand_gbm())
                .land_gbn_nm(registeredHouseDto.getLand_gbn_nm())
                .bonbeon(registeredHouseDto.getBonbeon())
                .bubeon(registeredHouseDto.getBubeon())
                .bldg_nm(registeredHouseDto.getBldg_nm())
                .dal_ymd(registeredHouseDto.getDal_ymd())
                .obj_amt(registeredHouseDto.getObj_amt())
                .bldg_area(registeredHouseDto.getBldg_area())
                .tot_area(registeredHouseDto.getTot_area())
                .h_floor(registeredHouseDto.getH_floor())
                .right_gbn(registeredHouseDto.getRight_gbn())
                .cntl_ymd(registeredHouseDto.getCntl_ymd())
                .build_year(registeredHouseDto.getBuild_year())
                .hous_type(registeredHouseDto.getHous_type())
                .req_gbn(registeredHouseDto.getReq_gbn())
                .rdealer_lawdnm(registeredHouseDto.getRdealer_lawdnm())
                .build();

        return RegisteredHouseDto.from(registeredHouseRepository.save(registeredHouse));
    }


}
