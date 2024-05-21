import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../config/firebase-config";

export const useGetMatches = () => {
    const [matches, setMatches] = useState([])

    const matchCollectionRef = collection(db, "matches");


    const getMatches = async () => {
        let unsubscribe
        try {
            const queryMatches = query(
                matchCollectionRef,
                orderBy("createdAt")
            )

            unsubscribe = onSnapshot(queryMatches, (snapshot) => {

                let docs = []

                snapshot.forEach((doc) => {
                    const data = doc.data()
                    const id = doc.id

                    docs.push({...data, id})
                })

                setMatches(docs)
            })
        } catch (err) {
            console.error(err)
        }

        return () => unsubscribe()
    }

    useEffect(() => {
        getMatches()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return {matches}
}