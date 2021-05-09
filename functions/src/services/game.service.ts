import {
  CreateGameReqDto,
  CreateGameResDto,
  JoinGameReqDto,
  JoinGameResDto,
  makeMoveReqDto,
  makeMoveResDto,
} from "../dtos/game.dto";
import { GameRepository } from "../repositories/game.repositories";
import { GameSchema } from "../schema/game.schema";
import { v4 as uuidv4 } from "uuid";
/**
 *
 * @param uid
 * @param dto
 * @returns
 */
export const createBoardService = async (
  dto: CreateGameReqDto
): Promise<CreateGameResDto> => {
  const newGame: GameSchema = {
    id: uuidv4(),
    boardSideLength: dto.boardSideLength,
    player1Id: dto.userId,
    player2Id: null,
    currPlayerId: dto.userId,
    winnerId: null,
    status: "waiting",
    player1MoveList: new Array<number>(),
    player2MoveList: new Array<number>(),
  };

  return CreateGameResDto.fromSchema(await GameRepository.createGame(newGame));
};

/**
 *
 * @param uid
 * @param dto
 * @returns
 */
export const joinBoardService = async (dto: JoinGameReqDto) => {
  const game = await GameRepository.getGameObject(dto.gameId);
  if (!game) {
    throw { detailMessage: "game doesn't exists", message: "data/find-game" };
  } else if (game.status != "waiting") {
    return JoinGameResDto.getReturnJson(false, "unable to join game", game);
  } else {
    await GameRepository.joinGame(game, dto.userId);
    return JoinGameResDto.getReturnJson(true, "success", game);
  }
};

export const makeMoveService = async (dto: makeMoveReqDto) => {
  const game = await GameRepository.getGameObject(dto.gameId);
  if (!game) {
    throw { detailMessage: "game doesn't exists", message: "data/find-game" };
  } else if (game.currPlayerId !== dto.userId) {
    throw { detailMessage: "not allowed", message: "game/not-allowed" };
  } else if (game.status != "playing") {
    throw {
      detailMessage: "game is not allowed to be played",
      message: "game/not-playable",
    };
  } else if (
    !legalMove(
      game.boardSideLength,
      dto.move,
      game.player1MoveList,
      game.player2MoveList
    )
  ) {
    throw {
      detailMessage: "game is not allowed to be played",
      message: "game/not-playable",
    };
  } else {
    const flag = findPlayerFlag(dto.userId, game);
    if (flag === 0) {
      throw { detailMessage: "not allowed", message: "game/not-allowed" };
    }
    await GameRepository.makeMove(game, dto.move, dto.userId, flag);
    const resultGame = await GameRepository.getGameObject(dto.gameId);
    if (!resultGame) {
      throw { detailMessage: "game doesn't exists", message: "data/find-game" };
    }
    const won = isWon(resultGame, flag, dto.move);
    if (won) {
      GameRepository.won(game);
    }
    return makeMoveResDto.getReturnJson(won, game);
  }
};

const findPlayerFlag = (player: string, game: GameSchema): playerFlag => {
  if (player === game.player1Id) {
    return 1;
  } else if (player === game.player2Id) {
    return 2;
  }
  return 0;
};

export type playerFlag = 0 | 1 | 2;

function isWon(game: GameSchema, player: playerFlag, move: number): boolean {
  const moveToWin = 3;
  let moveList = game.player1MoveList;
  if (player === 2) {
    moveList = game.player2MoveList;
  }
  return (
    winHorizontal(game.boardSideLength, move, moveList, moveToWin) ||
    winVertical(game.boardSideLength, move, moveList, moveToWin) ||
    winDiagonal(game.boardSideLength, move, moveList, moveToWin)
  );
}

function winHorizontal(
  sideLength: number,
  move: number,
  moveList: number[],
  moveToWin: number
): boolean {
  const winList = new Array<number>();
  for (let i = -moveToWin + 1; i < moveToWin; i++) {
    if (Math.floor((i + move) / sideLength) === Math.floor(move / sideLength)) {
      winList.push(i + move);
    }
  }
  let count = 0;
  for (let i of winList) {
    if (moveList.includes(i)) {
      count++;
    } else {
      count = 0;
    }
    if (count === moveToWin) {
      return true;
    }
  }
  return false;
}

function winVertical(
  sideLength: number,
  move: number,
  moveList: number[],
  moveToWin: number
): boolean {
  const winList = new Array<number>();
  for (let i = -moveToWin + 1; i < moveToWin; i++) {
    winList.push(i * sideLength + move);
  }
  let count = 0;
  for (let i of winList) {
    if (moveList.includes(i)) {
      count++;
    } else {
      count = 0;
    }
    if (count === moveToWin) {
      return true;
    }
  }
  return false;
}


function winDiagonal(
  sideLength: number,
  move: number,
  moveList: number[],
  moveToWin: number
): boolean {
  const winList1 = new Array<number>();
  for (let i = -moveToWin + 1; i < moveToWin; i++) {
    winList1.push(i * sideLength + i + move);
  }

  const winList2 = new Array<number>();
  for (let i = -moveToWin + 1; i < moveToWin; i++) {
    winList2.push(i * sideLength - i + move);
  }

  let count = 0;
  for (let i of winList1) {
    if (moveList.includes(i)) {
      count++;
    } else {
      count = 0;
    }
    if (count === moveToWin) {
      return true;
    }
  }

  for (let i of winList2) {
    if (moveList.includes(i)) {
      count++;
    } else {
      count = 0;
    }
    if (count === moveToWin) {
      return true;
    }
  }

  return false;
}

function legalMove(
  boardSideLength: number,
  move: number,
  player1MoveList: number[],
  player2MoveList: number[]
): boolean {
  if (move < 0 || move >= boardSideLength * boardSideLength) {
    return false;
  }
  if (player1MoveList.includes(move) || player2MoveList.includes(move)) {
    return false;
  }

  return true;
}
