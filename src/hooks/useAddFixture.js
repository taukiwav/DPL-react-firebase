import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo"


export const useAddFixture = () => {
    const fixtureCollectionRef = collection(db, "fixtures")
    const {userID} = useGetUserInfo()

    const addFixture = async ({
        teamOne,
        teamTwo,
        date
    }) => {
        await addDoc(fixtureCollectionRef, {
            userID,
            teamOne,
            teamTwo,
            date,
            createdAt: serverTimestamp()
        })
    }

    return {addFixture}
}