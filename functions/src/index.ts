import admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  createGameController,
  joinGameController,
  makeMoveController,
} from "./controllers/game.controller";
import { seedStuff } from "./loaders/mock.loader";
import cors from "cors";

admin.initializeApp();
const corsHandler = cors({ origin: true });

export const createGame = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    createGameController(req, res);
  });
});

export const joinGame = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    joinGameController(req, res);
  });
});

export const makeMove = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    makeMoveController(req, res);
  });
});

if (process.env.FUNCTIONS_EMULATOR === "true") {
  seedStuff();
}
