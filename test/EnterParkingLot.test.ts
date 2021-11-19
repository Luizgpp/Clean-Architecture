import EnterParkingLot from "../src/core/use-case/EnterParkingLot";
import GetParkingLot from "../src/core/use-case/GetParkingLot";
import ParkingLotRepositoryDB from "../src/infra/repository/ParkingLotRepositoryDB";
import ParkingLotRepositoryMemory from "../src/infra/repository/ParkingLotRepositoryMemory";

test('Should get parking lot', async () => {
    // const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRespositoryDB = new ParkingLotRepositoryDB();
    const getParkingLot = new GetParkingLot(parkingLotRespositoryDB);

    const parkingLot = await getParkingLot.execute("Paris");

    expect(parkingLot.code).toBe('Paris');
})

test.skip('Should enter parking lot', async () => {
    // const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRespositoryDB = new ParkingLotRepositoryDB();
    const getParkingLot = new GetParkingLot(parkingLotRespositoryDB);

    const enterParkingLot = new EnterParkingLot(parkingLotRespositoryDB);

    const parkingLotBeforeEnter = await getParkingLot.execute("Paris");

    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("Paris", "MDD-3131", new Date("2021-11-18T10:00:00"));

    const parkingLotAfterEnter = await getParkingLot.execute("Paris");

    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
})

test.skip('Should be closed', async () => {
    // const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRespositoryDB = new ParkingLotRepositoryDB();

    const enterParkingLot = new EnterParkingLot(parkingLotRespositoryDB);
    const getParkingLot = new GetParkingLot(parkingLotRespositoryDB);

    const parkingLotBeforeEnter = await getParkingLot.execute("Paris");

    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("Paris", "MDD-3131", new Date("2021-11-18T19:00:00"));
})

test.skip('Should be full', async () => {
    // const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotRespositoryDB = new ParkingLotRepositoryDB();

    const getParkingLot = new GetParkingLot(parkingLotRespositoryDB);
    const enterParkingLot = new EnterParkingLot(parkingLotRespositoryDB);

    const parkingLotBeforeEnter = await getParkingLot.execute("Paris");

    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("Paris", "MDD-3131", new Date("2021-11-18T15:00:00"));
    await enterParkingLot.execute("Paris", "MDD-3132", new Date("2021-11-18T15:00:00"));
    await enterParkingLot.execute("Paris", "MDD-3133", new Date("2021-11-18T15:00:00"));
    await enterParkingLot.execute("Paris", "MDD-3134", new Date("2021-11-18T15:00:00"));
    await enterParkingLot.execute("Paris", "MDD-3135", new Date("2021-11-18T15:00:00"));
    await enterParkingLot.execute("Paris", "MDD-3136", new Date("2021-11-18T15:00:00"));
});