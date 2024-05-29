import { getDocs, query, collection, orderBy } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useEffect, useState } from "react";

export const useGetTeams = () => {
  const [teams, setTeams] = useState([]);

  const teamCollectionRef = collection(db, "teams");

  const getTeams = async () => {
    try {
      const queryCheckTeam = query(teamCollectionRef, orderBy("teamName"));
      const querySnapshot = await getDocs(queryCheckTeam);

      let docs = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data().teamName);
        const data = doc.data();
        const id = doc.id;
        docs.push({ ...data, id });
      });

      setTeams(docs);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getTeams();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { teams };
};
