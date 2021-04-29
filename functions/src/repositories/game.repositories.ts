import * as admin from 'firebase-admin';
import { GameSchema } from "../schema/game.schema";

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
                        throw { detailMessage: "error while creating game", message: "data/create-game" }
                };
                return toReturn;
        }


        static async getGameObject(id: string): Promise<GameSchema | undefined> {
                const db = admin.firestore();
                return (await db.collection("gameCollection").doc(id).get()).data() as GameSchema;
        }

        /**
         * 
         * @param game game player want to join
         * @param playerId the player that join the game
         */
        static async joinGame(game: GameSchema, playerId: string) {
                const db = admin.firestore();

                const toMerge = {
                        player2Id: playerId,
                        status: "playing",
                }
                await db.collection("gameCollection").doc(game.id).set(toMerge, { merge: true });
        }
}