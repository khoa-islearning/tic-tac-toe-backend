/** schema of a game */
export type statusFlag = "playing" | "waiting" | "played" | "abandoned";
export interface GameSchema {
    id: string,
    boardSideLength: number,
    player1Id: string,
    player2Id: string | null,
    currPlayerId: string,
    winnerId: string | null,
    status: statusFlag,
    player1MoveList: number[],
    player2MoveList: number[]
}
