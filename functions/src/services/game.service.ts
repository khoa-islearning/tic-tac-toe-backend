import { CreateGameReqDto, CreateGameResDto, JoinGameReqDto, JoinGameResDto } from "../dtos/game.dto";
import { GameRepository } from "../repositories/game.repositories";
import { GameSchema } from "../schema/game.schema";
import { v4 as uuidv4 } from 'uuid';


/**
 * 
 * @param uid 
 * @param dto 
 * @returns 
 */
export const createBoardService = async (uid: string, dto: CreateGameReqDto): Promise<CreateGameResDto> => {


    const newGame: GameSchema = {
        id: uuidv4(),
        boardSideLength: dto.boardSideLength,
        player1Id: uid,
        player2Id: null,
        currPlayerId: uid,
        winnerId: null,
        status: "waiting",
        player1MoveList: [],
        player2MoveList: []
    };

    return CreateGameResDto.fromSchema(await GameRepository.createGame(newGame));
}

/**
 * 
 * @param uid 
 * @param dto 
 * @returns 
 */
export const joinBoardService = async (uid: string, dto: JoinGameReqDto) => {

    const game = await GameRepository.getGameObject(dto.gameId);
    if (!game) {
        throw { detailMessage: "game doesn't exists", message: "data/find-game" };
    } else if (game.status != "waiting") {
        return JoinGameResDto.getReturnJson(false, "unable to join game");
    } else {
        await GameRepository.joinGame(game, uid);
        return JoinGameResDto.getReturnJson(true, "success");
    }
}