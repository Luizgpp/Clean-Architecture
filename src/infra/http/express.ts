import Express from 'express';
import ExpressAdapter from '../../core/adapter/ExpressAdapter';
import ParkingLotController from '../../core/controller/ParkingLotController';
import GetParkingLot from '../../core/use-case/GetParkingLot';
import ParkingLotRepositoryDB from '../repository/ParkingLotRepositoryDB';

const app = Express();

app.get("/parkingLots/:code", async (req, res) => {
    const parkikingLotRespositoryDB = new ParkingLotRepositoryDB();
    const getParkingLot = new GetParkingLot(parkikingLotRespositoryDB);

    const parkinLot = await getParkingLot.execute(req.params.code);

    res.json(parkinLot);
})

app.get("/parkingLots/:code", ExpressAdapter.create(ParkingLotController.getPakingLot))

app.listen(3000);