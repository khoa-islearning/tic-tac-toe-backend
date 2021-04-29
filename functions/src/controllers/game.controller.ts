import * as functions from "firebase-functions";
import * as boardService from '../services/game.service';
// import { handleJwtToken } from '../utilities/firebase.util';



/**
 * 
 * @param request 
 * @param response 
 * @returns 
 */
export const createGameController = async (request: functions.https.Request, response: functions.Response<any>
) => {
    try {
        // const user = await handleJwtToken(request)
        // if (!user) {
        //     return;
        // }
        // if (user.displayName != request.body.player1) {
        //     throw { detailMessage: "User is not authorized", message: "auth/user-not-authorized" };
        // }

        response.status(200).send(await boardService.createBoardService(request));

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

                case "game/wrong-document-format":
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


