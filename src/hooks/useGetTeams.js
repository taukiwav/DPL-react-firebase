import { collection, getDocs } from "firebase/firestore"
import { db } from "../config/firebase-config"

export const useGetTeams = async () => {
    const teamsRef = collection(db, "teams")
    const snapshot = await getDocs(teamsRef)
    return snapshot.docs.map( doc => ({
        id:doc.id,
        ...doc.data()
    }))
}