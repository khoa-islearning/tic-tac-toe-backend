import admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  createGameController,
  joinGameController,
  makeMoveController,
} from "./controllers/game.controller.js";
import { seedStuff } from "./loaders/mock.loader.js";


admin.initializeApp();

export const createGame = functions.https.onRequest(createGameController);

export const joinGame = functions.https.onRequest(joinGameController);

export const makeMove = functions.https.onRequest(makeMoveController);

if (process.env.FUNCTIONS_EMULATOR === "true") {
  seedStuff();
}

