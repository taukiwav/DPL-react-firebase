import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useAddTeam = () => {

    const addTeam = async ({
        teamName
    }) => {
        await setDoc(doc(collection(db,"teams"), teamName),{
            teamName,
            badge:"https://firebasestorage.googleapis.com/v0/b/thedpl-187ff.appspot.com/o/default50x50.png?alt=media&token=f1476380-3553-4773-a628-0f1dc6b53a53",
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