import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export default async function ProcessResult(homeTeam, homeGoals, awayTeam, awayGoals) {
    const homeTeamRef = doc(db,"teams", homeTeam)
    const awayTeamRef = doc(db,"teams", awayTeam)
    
    await updateDoc(homeTeamRef, {
        played: increment(1),
        goalsFor: increment(homeGoals),
        goalsAgainst: increment(awayGoals)
    })
    
    const homeTeamSnap = await getDoc(homeTeamRef)
    
    await updateDoc(homeTeamRef, {
        goalDifference: homeTeamSnap.data().goalsFor - homeTeamSnap.data().goalsAgainst
    })
    
    await updateDoc(awayTeamRef, {
        played: increment(1),
        goalsFor: increment(awayGoals),
        goalsAgainst: increment(homeGoals)
    })
    
    const awayTeamSnap = await getDoc(awayTeamRef)

    await updateDoc(awayTeamRef, {
        goalDifference: awayTeamSnap.data().goalsFor - awayTeamSnap.data().goalsAgainst
    })

    if (homeGoals === awayGoals) {
        await updateDoc(homeTeamRef, {
            draws: increment(1),
            points: increment(1)
        })

        await updateDoc(awayTeamRef, {
            draws: increment(1),
            points: increment(1)
        })
    }
    if (homeGoals > awayGoals) {
        await updateDoc(homeTeamRef, {
            wins: increment(1),
            points: increment(3)
        })

        await updateDoc(awayTeamRef, {
            losses: increment(1)
        })
    }
    if (homeGoals < awayGoals) {
        await updateDoc(awayTeamRef, {
            wins: increment(1),
            points: increment(3)
        })

        await updateDoc(homeTeamRef, {
            losses: increment(1)
        })
    }
}