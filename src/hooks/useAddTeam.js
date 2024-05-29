import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useAddTeam = () => {

    const addTeam = async ({
        teamName
    }) => {
        await setDoc(doc(collection(db,"teams"), teamName),{
            teamName,
            played:0,
            wins:0,
            draws:0,
            losses:0,
            goalsFor:0,
            goalsAgainst:0,
            goalDifference:0,
            points:0
        })
    }
    
    return {addTeam}
}