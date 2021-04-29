import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as functions from "firebase-functions";
import { CreateGameReqDto, JoinGameReqDto } from "../dtos/game.dto";
import * as boardService from '../services/game.service';
import { handleJwtToken } from '../utilities/firebase.util';



/**
 * 
 * @param request 
 * @param response 
 * @returns 
 */
export const createGameController = async (request: functions.https.Request, response: functions.Response<any>
) => {
    try {
        const user = await handleJwtToken(request);
        if (!user) {
            return;
        }


        const reqBody = plainToClass(CreateGameReqDto, request.body);
        const errors: ValidationError[] = await validate(reqBody);
        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
            throw { detailMessage: message, message: "createGame/wrong-format" };
        }

        response.status(200).send(await boardService.createBoardService(user.uid, reqBody));

    } catch (error) {

        if (error.message && error.detailMessage) {
            switch (error.message) {
                case "auth/missing-jwt":
                    response.status(400).send(error.detailMessage);
                    break;

                case "auth/user-not-authorized":
                    response.status(401).send(error.detailMessage);
                    break;

                case "game/illegal-length":
                    response.status(400).send(error.detailMessage);
                    break;

                case "createGame/wrong-format":
                    response.status(400).send(error.detailMessage);

                case "data/create-game":
                    response.status(500).send();
                    break;
            }
        } else {
            console.log(error);
            response.status(500).send("Internal server error");
        }
    }
}

/**
 * 
 * @param request 
 * @param response 
 * @returns 
 */
export const joinGameController = async (request: functions.https.Request, response: functions.Response<any>
) => {
    try {
        const user = await handleJwtToken(request);
        if (!user) {
            return;
        }

        const reqBody: JoinGameReqDto = plainToClass(JoinGameReqDto, request.body);
        const errors: ValidationError[] = await validate(reqBody);

        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
            throw { detailMessage: message, message: "joinGame/wrong-format" };
        }
        response.status(200).send(await boardService.joinBoardService(user.uid, reqBody));
    } catch (error) {
        if (error.message && error.detailMessage) {
            switch (error.message) {
                case "auth/missing-jwt":
                    response.status(400).send(error.detailMessage);
                    break;

                case "auth/user-not-authorized":
                    response.status(401).send(error.detailMessage);
                    break;

                case "joinGame/wrong-format":
                    response.status(400).send(error.detailMessage);
                    break;

                case "data/find-game":
                    response.status(400).send(error.detailMessage);
            }
        } else {
            console.log(error);
            response.status(500).send("Internal server error");
        }
    }
}