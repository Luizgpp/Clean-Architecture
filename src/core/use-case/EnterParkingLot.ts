import ParkedCar from "../entity/ParkedCar";
import ParkingLotRepository from "../repository/ParkingLotRepository";

export default class EnterParkingLot {
    parkingLotRepository: ParkingLotRepository;

    constructor(parkingLotRepository: ParkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }

    async execute(code: string, plate: string, date: Date) {
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);
        const parkedCar = new ParkedCar(code, plate, date);

        if (parkingLot.isClosed(parkedCar.date)) throw new Error("Parking lot is closed");

        if (parkingLot.isFull()) throw new Error("Parking lot is full");

        await this.parkingLotRepository.saveParkedCar(parkedCar.code, parkedCar.plate, parkedCar.date);

        return parkingLot;
    }
}