import ParkingLotRepositoryDB from "../../infra/repository/ParkingLotRepositoryDB";
import GetParkingLot from "../use-case/GetParkingLot";

export default class ParkingLotController {
    static async getPakingLot(params, body) {
        const parkingLotRespositoryDB = new ParkingLotRepositoryDB();
        const getParkingLot = new GetParkingLot(parkingLotRespositoryDB);
        return getParkingLot.execute(params.code);
    }
}