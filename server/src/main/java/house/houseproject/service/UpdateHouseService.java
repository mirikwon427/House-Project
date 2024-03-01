package house.houseproject.service;

import house.houseproject.Repository.HUserRepository;
import house.houseproject.Repository.LikedRepository;
import house.houseproject.Repository.RegisteredHouseRepository;
import house.houseproject.domain.HUser;
import house.houseproject.domain.Liked;
import house.houseproject.domain.RegisteredHouse;
import house.houseproject.dto.DeleteHouseDto;
import house.houseproject.dto.UpdateHouseDto;
import house.houseproject.exception.NotFoundMemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
@Slf4j
@Service
public class UpdateHouseService {

    private final RegisteredHouseRepository registeredHouseRepository;
    private final LikedRepository likedRepository;

    public UpdateHouseService(RegisteredHouseRepository registeredHouseRepository, LikedRepository likedRepository) {
        this.registeredHouseRepository = registeredHouseRepository;
        this.likedRepository = likedRepository;
    }
        @Transactional
        public UpdateHouseDto updateHouse(UpdateHouseDto updateHouseDto) throws Exception {

            int registeredHouseId = 0;
            try {
                registeredHouseId = updateHouseDto.getRegisteredHouse_id();

                Optional<RegisteredHouse> update = registeredHouseRepository.findByRegisteredHouseId(registeredHouseId);

                if (update.isPresent()) {

                    RegisteredHouse registeredHouse = update.get(); //null 인지 확인

                    registeredHouse.setDirection(updateHouseDto.getDirection());
                    registeredHouse.setEntranceStructure(updateHouseDto.getEntranceStructure());
                    registeredHouse.setNumberOfHouseholds(updateHouseDto.getNumberOfHouseholds());
                    registeredHouse.setAddress(updateHouseDto.getAddress());
                    registeredHouse.setAddressRoad(updateHouseDto.getAddressRoad());
                    registeredHouse.setManagementFee(updateHouseDto.getManagementFee());
                    registeredHouse.setSggNm(updateHouseDto.getSggNm());
                    registeredHouse.setBjdongNm(updateHouseDto.getBjdongNm());
                    registeredHouse.setParkingSpaces(updateHouseDto.getParkingSpaces());
                    registeredHouse.setDescription(updateHouseDto.getDescription());
                    registeredHouse.setFloor(updateHouseDto.getFloor());
                    registeredHouse.setTotalFloor(updateHouseDto.getTotalFloor());
                    registeredHouse.setRoom(updateHouseDto.getRoom());
                    registeredHouse.setBathroom(updateHouseDto.getBathroom());
                    registeredHouse.setSupplyArea(updateHouseDto.getSupplyArea());
                    registeredHouse.setNetLeasableArea(updateHouseDto.getNetLeasableArea());
                    registeredHouse.setHouseType(updateHouseDto.getHouseType());
                    registeredHouse.setObjAmt(updateHouseDto.getObjAmt());
                    registeredHouse.setBldgNm(updateHouseDto.getBldgNm());
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

    @Transactional
    public boolean deleteHouse(int userId, int houseId) {
        try {

            RegisteredHouse registeredHouse = registeredHouseRepository.findById(houseId)
                    .orElseThrow(ChangeSetPersister.NotFoundException::new);

            List<Liked> likedList = likedRepository.findAllByUserIdAndRegisteredId(userId, houseId);

            if(likedList != null) {
                // 조회된 찜한 매물 삭제
                likedRepository.deleteAll(likedList);

            }

            registeredHouseRepository.delete(registeredHouse);

            return true;
        } catch (Exception e) {
            // 예외 처리 및 로깅
            return false;
        }



    }





}
