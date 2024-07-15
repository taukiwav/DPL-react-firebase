import { collection, doc, writeBatch } from "firebase/firestore"
import { db } from "../config/firebase-config"
import ProcessPlayerStats from "../hooks/useProcessPlayerStat"



export const useAddStatUpdate = () => {

    const homeTeam = ""
    const awayTeam = ""
    
    const matchId = "";
    
    const homePlayerStats = [
      { name: "", goals: 0, assists: 0, redCard: "No" },
    ];
    
    const awayPlayerStats = [
      { name: "", goals: 0, assists: 0, redCard: "No" },
    ];

    const addStatUpdate = async () => {

        ProcessPlayerStats(homeTeam, awayTeam, homePlayerStats, awayPlayerStats)

        const batch = writeBatch(db)

        const matchRef = doc(collection(db, "matches"), matchId)
        batch.update(matchRef,{
            homePlayerStats,
            awayPlayerStats
        })

        try {
            await batch.commit()
            console.log("Adding Missing Match Stats Batch Succeeded")
        } catch (error) {
            console.error('ERROR Writing Missing Match Stats Batch: ', error)
        }
    }

    return {addStatUpdate}
}

