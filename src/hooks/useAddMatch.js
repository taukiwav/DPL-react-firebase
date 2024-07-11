import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"

export const useAddMatch = () => {
    const matchCollectionRef = collection(db, "matches")
    const {userID} = useGetUserInfo()

    const addMatch = async ({
        homeTeam,
        homeGoals,
        awayTeam,
        awayGoals,
        homePlayerStats,
        awayPlayerStats
    }) => {
        await addDoc(matchCollectionRef,{
            userID,
            homeTeam,
            homeGoals,
            awayTeam,
            awayGoals,
            homePlayerStats,
            awayPlayerStats,
            createdAt: serverTimestamp()
        })
    }

    return {addMatch}
}