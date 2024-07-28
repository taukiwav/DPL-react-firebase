import { collection, getDocs } from "firebase/firestore"
import { db } from "../config/firebase-config"

export const useGetPlayerNames = async () => {
    const teamsRef = collection(db, "teams")
    const teamsSnapshot = await getDocs(teamsRef)

    const allPlayers = {}

    for (const teamDoc of teamsSnapshot.docs) {
        const rosterSnapshot = await getDocs(collection(teamDoc.ref, "roster"))
        const playerNames = rosterSnapshot.docs.map(playerDoc => playerDoc.id)
        allPlayers[teamDoc.id] = playerNames
    }

    return allPlayers
}