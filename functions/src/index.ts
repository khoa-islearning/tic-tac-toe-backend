import admin from "firebase-admin";
import * as functions from "firebase-functions";
import { createGameController, joinGameController } from "./controllers/game.controller.js";

admin.initializeApp();

export const createGame = functions.https.onRequest(createGameController);

export const joinGame = functions.https.onRequest(joinGameController);