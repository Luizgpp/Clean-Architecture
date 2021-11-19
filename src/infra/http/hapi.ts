import Hapi from "@hapi/hapi";
import HapiAdapter from "../../core/adapter/HapiAdapter";
import ParkingLotController from "../../core/controller/ParkingLotController";

const server = Hapi.server({
    port: 4000,
    host: "localhost"
});

server.route({
    method: "GET",
    path: "/parkingLots/{code}",
    handler: HapiAdapter.create(ParkingLotController.getPakingLot)
})

server.start();