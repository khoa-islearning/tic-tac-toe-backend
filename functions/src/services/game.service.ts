import * as functions from "firebase-functions";
import { CreateGameReqDto, CreateGameResDto } from "../dtos/game.dto";
import { GameRepository } from "../repositories/game.repositories";
import { GameSchema } from "../schema/game.schema";
import { v4 as uuidv4 } from 'uuid';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';


/**
 * 
 * @param request contains p1's user id, is
 * @returns 
 */
export const createBoardService = async (request: functions.https.Request) => {


    const reqBody: CreateGameReqDto = plainToClass(CreateGameReqDto, request.body);

    const errors: ValidationError[] = await validate(reqBody);
    if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints!)).join(', ');
        throw { detailMessage: message, message: "game/wrong-document-format" };
    }

    if (reqBody.boardSideLength < 3) {
        throw { detailMessage: "Board size is too small to play game", message: "game/illegal-length" };
    }


    const newGame: GameSchema = {
        id: uuidv4(),
        boardSideLength: reqBody.boardSideLength,
        player1Id: reqBody.playerId,
        player2Id: null,
        currPlayerId: reqBody.playerId,
        winnerId: null,
        status: "waiting",
        player1MoveList: [],
        player2MoveList: []
    };

    return CreateGameResDto.fromSchema(await GameRepository.createGame(newGame));
};

export const makeMove = async (request: functions.https.Request) => {

}