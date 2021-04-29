import { GameSchema } from "../schema/game.schema";
import { IsInt, IsString, Min } from 'class-validator'

export class CreateGameResDto {
  gameId: string

  static fromSchema(aGame: GameSchema): CreateGameResDto {
    return {
      gameId: aGame.id
    };
  }
}

export class CreateGameReqDto {
  @IsString()
  playerId: string;

  @IsInt()
  @Min(3)
  boardSideLength: number;
}

