import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase-config";
import "../App.css"
import "./Results.css"

export default function Results() {
  const [groupedMatches, setGroupedMatches] = useState({})

  useEffect(() => {
    const fetchMatches = async () => {
      const snapshot = await getDocs(query(collection(db, "matches"),orderBy("createdAt","desc")))
      const matchesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().createdAt.seconds*1000)
      }))

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

  // Adding Team Logos

  const [teamLogos, setTeamLogos] = useState({})

  useEffect(() => {
    const fetchTeamLogos = async () => {
      const logosSnapshot = await getDocs(collection(db,"teams"))
      const logos = {}
      logosSnapshot.forEach(doc => {
        logos[doc.id] = doc.data().badge
      })
      setTeamLogos(logos)
    }
    fetchTeamLogos()
  },[])

  return (
    <div className="results">
      <div className="results-container">
        <h1>Results</h1>
        {Object.keys(groupedMatches).map((date) => (
          <div key={date}>
            <h2>{date}</h2>
            <table className="results-contents">
              <tbody>
                {groupedMatches[date].map((match) => (
                  <tr key={match.id}>
                    <td colSpan="3">
                      <div className="results-row">
                        <div className="home-team">
                          {match.homeTeam}
                          <img
                            src={teamLogos[match.homeTeam]}
                            alt=""
                            className="results-home-team-club-img"
                          />
                        </div>
                        <div className="score">
                          {match.homeGoals} - {match.awayGoals}
                        </div>
                        <div className="away-team">
                          <img
                            src={teamLogos[match.awayTeam]}
                            alt=""
                            className="results-away-team-club-img"
                          />
                          {match.awayTeam}
                        </div>
                      </div>
                    </td>
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
