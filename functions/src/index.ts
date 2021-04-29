import admin from "firebase-admin";
import * as functions from "firebase-functions";
import { createGameController } from "./controllers/game.controller.js";

admin.initializeApp();

export const createGame = functions.https.onRequest(createGameController);

// export const testApi = functions.https.onRequest((request, response) => {
//     if (request.body["hehe"] != "hihihi") {
//         response.status(200).send("nonono");
//         return;
//     }
//     response.status(200).send("okok");
//     return;
// });