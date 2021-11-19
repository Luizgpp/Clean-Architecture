import ParkingLotRepository from "../repository/ParkingLotRepository";

export default class LeaveParkingLot {
    parkingLotRepository: ParkingLotRepository;

    constructor(parkingLotRespository: ParkingLotRepository) {
        this.parkingLotRepository = parkingLotRespository;
    }

    async execute(code: string, plate: string) {
        await this.parkingLotRepository.removeParkedCar(code, plate);
    }

}