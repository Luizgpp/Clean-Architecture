import ParkingLotAdapter from "../../core/adapter/ParkingLotAdapter";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import * as database from "../database/database";

export default class ParkingLotRepositoryDB implements ParkingLotRepository {

    async getParkingLot(code: string): Promise<any> {

        try {
            const db = await database.connect();

            const query = { code: code };
            const parkedLotCollection = await db.collection('ParkedLot');
            const parkedCarCollection = await db.collection('ParkedCar');

            const parkingLotData = await parkedLotCollection.findOne(query);
            const occupiedSpaces = await parkedCarCollection.find(query).count();

            database.closeCon();

            return ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupiedSpaces);
        } catch (error) {
            throw new Error(error);
        }
    }
    async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
        const db = await database.connect();
        const parkedCarCollection = db.collection('ParkedCar');

        const newParkedCar = {
            code,
            plate,
            date
        }

        await parkedCarCollection.insertOne(newParkedCar);
        database.closeCon();
    }

    async removeParkedCar(code: any, plate: any): Promise<void> {
        const db = await database.connect();
        const parkedCarCollection = db.collection('ParkedCar');

        const query = { code: code, plate: plate };

        await parkedCarCollection.findOneAndDelete(query);

        database.closeCon();
    }

}