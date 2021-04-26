import * as functions from "firebase-functions";
import admin from "firebase-admin";

/**
 *  obtain and pass jwt to extractFirebaseUser to obtain user
 * @param request 
 * @returns : Promise<admin.auth.UserRecord
 */
export const handleJwtToken = async (request: functions.https.Request): Promise<admin.auth.UserRecord> => {
    let myJwt: string;
    try {
        myJwt = await extractJwt(request);
    } catch (error) {
        throw { detailMessage: "Missing JWT Token from Request", message: "auth/missing-jwt" };
    }

    try {
        return await extractFirebaseUser(myJwt);
    } catch (error) {
        throw { detailMessage: "User is not authorized", message: "auth/user-not-authorized" };
    }

}

/**
 * obtain user record form google authentication
 * @param jwt 
 * @returns : Promise<admin.auth.UserRecord
 */
const extractFirebaseUser = async (jwt: string): Promise<admin.auth.UserRecord> => {
    try {
        admin.auth().verifyIdToken(jwt);
        return await admin.auth().getUser(jwt);
    } catch (error) {
        throw new Error("user doesnt't exists")
    }
}
/**
 * extract jwt from bearer token
 * @param request 
 * @returns 
 */
const extractJwt = async (request: functions.https.Request) => {

    const myBearer = request.headers.authorization;

    if (myBearer == null) {
        throw new Error("bearer is null");
    }

    const myJwt = myBearer?.split(" ")[1];
    return myJwt;
}