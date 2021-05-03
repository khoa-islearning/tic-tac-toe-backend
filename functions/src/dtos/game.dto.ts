import { GameSchema } from "../schema/game.schema";
import { IsInt, IsString, Min } from "class-validator";

export class CreateGameResDto {
  gameId: string;

  static fromSchema(aGame: GameSchema): CreateGameResDto {
    return {
      gameId: aGame.id,
    };
  }
}

export class CreateGameReqDto {
  @IsInt()
  @Min(3)
  boardSideLength: number;
  @IsString()
  userId: string;
}

export class JoinGameReqDto {
  @IsString()
  gameId: string;
  @IsString()
  userId: string;
}


export type joinStatus = "joined" | "failed";
export class JoinGameResDto {
  result: joinStatus;
  message: string;

  /**
   *
   * @param joinResult
   * @param joinMessage
   * @returns json object to return to client
   */
  static getReturnJson(
    joinResult: boolean,
    joinMessage: string
  ): JoinGameResDto {
    if (joinResult) {
      return {
        result: "joined",
        message: joinMessage,
      };
    }
    return {
      result: "failed",
      message: joinMessage,
    };
  }
}

export class makeMoveReqDto {
  @IsInt()
  move: number;
  @IsString()
  gameId: string;
  @IsString()
  userId: string;
}

export class makeMoveResDto {
  isWon: boolean;

  static getReturnJson(wonStatus: boolean): makeMoveResDto {
    return {
      isWon: wonStatus,
    };
  }
}
