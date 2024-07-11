import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase-config";

export default async function ProcessPlayerStats(homeTeam, awayTeam, homePlayerStats, awayPlayerStats) {
    const batch = writeBatch(db)
    homePlayerStats.forEach((player) => {
        const homePlayerRef = doc(collection(db, `teams/${homeTeam}/roster`), player.name)
        batch.update(homePlayerRef, {
            goals: increment(player.goals),
            assists: increment(player.assists),
            red: player.redCard === "Yes" ? increment(1) : increment(0)
        })
    })

    awayPlayerStats.forEach((player) => {
        const awayPlayerRef = doc(collection(db,`teams/${awayTeam}/roster`), player.name)
        batch.update(awayPlayerRef, {
            goals: increment(player.goals),
            assists: increment(player.assists),
            red: player.redCard === "Yes" ? increment(1) : increment(0)
        })
    })

    try {
        await batch.commit()
        console.log("Stats Batch Write Succeeded")
    } catch (error) {
        console.error("Error Writing Stats Batch")
    }
}