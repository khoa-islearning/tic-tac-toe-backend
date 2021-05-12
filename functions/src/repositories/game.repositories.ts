import * as admin from "firebase-admin";
import { GameSchema } from "../schema/game.schema";
import { playerFlag } from "../services/game.service";

export class GameRepository {
  /**
   *
   * @param aGame game to be saved on firestore
   * @returns id of the newly created game
   */
  static async createGame(aGame: GameSchema): Promise<GameSchema> {
    const db = admin.firestore();
    await db.collection("gameCollection").doc(aGame.id).set(aGame);
    const toReturn = await this.getGameObject(aGame.id);
    if (!toReturn) {
      throw {
        detailMessage: "error while creating game",
        message: "data/create-game",
      };
    }
    return toReturn;
  }

  static async getGameObject(id: string): Promise<GameSchema | undefined> {
    const db = admin.firestore();
    return (
      await db.collection("gameCollection").doc(id).get()
    ).data() as GameSchema;
  }

  /**
   *
   * @param game game player want to join
   * @param playerId the player that join the game
   */
  static async joinGame(game: GameSchema, playerId: string) {
    const db = admin.firestore();

    const toMerge = {
      player2Id: playerId as GameSchema["player2Id"],
      status: "playing" as GameSchema["status"],
    };
    await db
      .collection("gameCollection")
      .doc(game.id)
      .set(toMerge, { merge: true });
  }

  static async makeMove(
    game: GameSchema,
    move: number,
    player: string,
    flag: playerFlag
  ) {
    const db = admin.firestore();

    if (flag == 1) {
      const temp = game.player1MoveList;
      temp.push(move);
      const toMerge = {
        player1MoveList: temp,
        currPlayerId: game.player2Id,
      };
      await db
        .collection("gameCollection")
        .doc(game.id)
        .set(toMerge, { merge: true });
    } else {
      const temp = game.player2MoveList;
      temp.push(move);
      const toMerge = {
        player2MoveList: temp,
        currPlayerId: game.player1Id,
      };
      await db
        .collection("gameCollection")
        .doc(game.id)
        .set(toMerge, { merge: true });
    }
  }

  static async won(game: GameSchema) {
    const db = admin.firestore();
    const toMerge = {
      status: "played",
      winnerId: game.currPlayerId,
    };
    await db
      .collection("gameCollection")
      .doc(game.id)
      .set(toMerge, { merge: true });
  }
}
