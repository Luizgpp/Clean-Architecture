import ParkingLotAdapter from "../../core/adapter/ParkingLotAdapter";
import ParkedCar from "../../core/entity/ParkedCar";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {
    parkingLots = [
        {
            code: "Paris",
            capacity: 5,
            open_hour: 8,
            close_hour: 18
        }
    ]

    parkedCars = []

    getParkingLot(code: string): Promise<ParkingLot> {
        const { code: parkingCode, capacity, open_hour, close_hour } = this.parkingLots.find((parkingLot) => parkingLot.code === code);

        const occupiedSpaces = this.parkedCars.length;

        const parkingLot = ParkingLotAdapter.create(parkingCode, capacity, open_hour, close_hour, occupiedSpaces);

        return Promise.resolve(parkingLot);
    }

    saveParkedCar(code: string, plate: string, date: Date): void {
        const newParkedCar = {
            code,
            plate,
            date
        }

        this.parkedCars.push(newParkedCar);
    }

    removeParkedCar(code: any, plate: any): void {
        const index = this.parkedCars?.findIndex((car) => { return car.code === code && car.plate === plate });
        this.parkedCars.splice(index, 1)
    }
}