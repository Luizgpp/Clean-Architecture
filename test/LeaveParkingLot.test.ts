import EnterParkingLot from "../src/core/use-case/EnterParkingLot";
import GetParkingLot from "../src/core/use-case/GetParkingLot";
import LeaveParkingLot from "../src/core/use-case/LeaveParkingLot";
import ParkingLotRepositoryDB from "../src/infra/repository/ParkingLotRepositoryDB";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";

test('Shoud leave parking lot', async () => {
    // const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRespositoryDB = new ParkingLotRepositoryDB();
    const getParkingLot = new GetParkingLot(parkingLotRespositoryDB);

    const enterParkingLot = new EnterParkingLot(parkingLotRespositoryDB);
    await enterParkingLot.execute("Paris", "MDD-3131", new Date("2021-11-18T10:00:00"));

    const parkingLotBeforeLeave = await getParkingLot.execute('Paris');
    expect(parkingLotBeforeLeave.occupiedSpaces).toBe(1);

    const leaveParkingLot = new LeaveParkingLot(parkingLotRespositoryDB);
    await leaveParkingLot.execute("Paris", "MDD-3131");

    const parkingLotAfterLeave = await getParkingLot.execute('Paris');
    expect(parkingLotAfterLeave.occupiedSpaces).toBe(0);
})