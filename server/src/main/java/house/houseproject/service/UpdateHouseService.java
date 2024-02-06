package house.houseproject.service;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.dto.UpdateHouseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;
@Slf4j
@Service
public class UpdateHouseService {

    private final RegisteredHouseRepository registeredHouseRepository;


    public UpdateHouseService(RegisteredHouseRepository registeredHouseRepository) {
        this.registeredHouseRepository = registeredHouseRepository;

    }
        @Transactional
        public UpdateHouseDto updateHouse(UpdateHouseDto updateHouseDto) throws Exception {

            int registeredHouseId = 0;
            try {
                registeredHouseId = updateHouseDto.getRegisteredHouse_id();

                Optional<RegisteredHouse> update = registeredHouseRepository.findByRegisteredHouseId(registeredHouseId);

                if (update.isPresent()) {

                    RegisteredHouse registeredHouse = update.get(); //null 인지 확인

                    registeredHouse.setAcc_year(updateHouseDto.getAcc_year());
                    registeredHouse.setSgg_cd(updateHouseDto.getSgg_cd());
                    registeredHouse.setSgg_nm(updateHouseDto.getSgg_nm());
                    registeredHouse.setBjdong_cd(updateHouseDto.getBjdong_cd());
                    registeredHouse.setBjdong_nm(updateHouseDto.getBjdong_nm());
                    registeredHouse.setLand_gbm(updateHouseDto.getLand_gbm());
                    registeredHouse.setLand_gbn_nm(updateHouseDto.getLand_gbn_nm());
                    registeredHouse.setBonbeon(updateHouseDto.getBonbeon());
                    registeredHouse.setBubeon(updateHouseDto.getBubeon());
                    registeredHouse.setBldg_nm(updateHouseDto.getBldg_nm());
                    registeredHouse.setDal_ymd(updateHouseDto.getDal_ymd());
                    registeredHouse.setObj_amt(updateHouseDto.getObj_amt());
                    registeredHouse.setBldg_area(updateHouseDto.getBldg_area());
                    registeredHouse.setTot_area(updateHouseDto.getTot_area());
                    registeredHouse.setH_floor(updateHouseDto.getH_floor());
                    registeredHouse.setRight_gbn(updateHouseDto.getRight_gbn());
                    registeredHouse.setCntl_ymd(updateHouseDto.getCntl_ymd());
                    registeredHouse.setBuild_year(updateHouseDto.getBuild_year());
                    registeredHouse.setHous_type(updateHouseDto.getHous_type());
                    registeredHouse.setReq_gbn(updateHouseDto.getReq_gbn());
                    registeredHouse.setRdealer_lawdnm(updateHouseDto.getRdealer_lawdnm());
                    // 나머지 필드 설정


                    RegisteredHouse updatedHouse = registeredHouseRepository.save(registeredHouse);

                    return updateHouseDto(updatedHouse);

                } else {
                    throw new NoSuchElementException("RegisteredHouse not found with ID: " + registeredHouseId);
                }
            } catch (Exception e) {
                // 예외 처리 로직 추가
                log.error("Error updating RegisteredHouse with ID {}: {}", registeredHouseId, e.getMessage(), e);
                throw new Exception("Error updating RegisteredHouse", e);
            }
        }

private UpdateHouseDto updateHouseDto(RegisteredHouse registeredHouse) {
    UpdateHouseDto updateHouseDto = new UpdateHouseDto();
    updateHouseDto.setRegisteredHouse_id(registeredHouse.getRegisteredHouseId());
    // 나머지 필드 설정

    return updateHouseDto;
}





}
