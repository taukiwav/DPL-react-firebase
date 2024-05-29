import React, { useEffect, useState } from "react";
import "../App.css"
import "./Results.css"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase-config";

export default function Results() {
  // const [matches, setMatches] = useState([])
  const [groupedMatches, setGroupedMatches] = useState({})

  useEffect(() => {
    const fetchMatches = async () => {
      const snapshot = await getDocs(query(collection(db, "matches"),orderBy("createdAt")))
      const matchesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        //added line below to implement grouped by date
        date: new Date(doc.data().createdAt.seconds*1000)
      }))
      // setMatches(matchesData)
      const grouped = matchesData.reduce((acc,match) => {
        const dateKey = match.date.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
        if (!acc[dateKey]) {
          acc[dateKey] = []
        }
        acc[dateKey].push(match)
        return acc
      },{})
      
      setGroupedMatches(grouped)
    }

    fetchMatches()
  },[])

  return (
    <div className="results">
      <div className="results-container">
        <h1>Results</h1>
        {Object.keys(groupedMatches).map(date => (
          <div key={date}>
            <h2>{date}</h2>
            <table className="results-contents">
              <tbody>
                {groupedMatches[date].map(match => (
                  <tr className="result-row" key={match.id}>
                    <td className="home-team">{match.homeTeam}</td>
                    <td className="score">{match.homeGoals} - {match.awayGoals}</td>
                    <td className="away-team">{match.awayTeam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
