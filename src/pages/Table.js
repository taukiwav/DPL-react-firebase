import React, { useEffect, useState } from "react";
import "../App.css";
import "./Table.css"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase-config";

export default function Table() {
  const [played,setPlayed] = useState("Played")
  const [won, setWon] = useState("Won")
  const [drawn,setDrawn] = useState("Drawn")
  const [lost, setLost] = useState("Lost")
  const [points, setPoints] = useState("Points")

  const shortColName = () => {
    if(window.innerWidth <= 520) {
      setPlayed("Pl")
      setWon("W")
      setDrawn("D")
      setLost("L")
      setPoints("Pts")
    } else {
      setPlayed("Played")
      setWon("Won")
      setDrawn("Drawn")
      setLost("Lost")
      setPoints("Points")
    }
  }

  useEffect(() => {
    shortColName()
  })

  const getGDClass = (goalDiff) => {
    return goalDiff > 0 ? 'positive-gd' : goalDiff < 0 ? 'negative-gd' : ''
  }

  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(query(collection(db, "teams"),orderBy("points",'desc')))
      const teamsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // eslint-disable-next-line array-callback-return
      teamsData.sort((a,b) => {
        if (b.points === a.points) {
          if (b.goalDifference !== a.goalDifference) {
            return b.goalDifference - a.goalDifference;
          } else if (b.goalsFor !== a.goalsFor) {
            return b.goalsFor - a.goalsFor;
          } else {
            return a.goalDifference - b.goalDifference;
          }
        }
      })
      setTeams(teamsData)
    }
    fetchData()
  },[])


  window.addEventListener("resize", shortColName);

  return (
    <div className="table">
      <div className="table-container">
        <h1>TABLE</h1>
        <table className="table-contents">
          <thead>
            <tr>
              <th>Pos</th>
              <th className="table-club">Club</th>
              <th className="table-numbers">{played}</th>
              <th className="table-numbers">{won}</th>
              <th className="table-numbers">{drawn}</th>
              <th className="table-numbers">{lost}</th>
              <th className="table-numbers">GF</th>
              <th className="table-numbers">GA</th>
              <th className="table-numbers">GD</th>
              <th className="table-numbers">{points}</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team,index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td className="table-club">{team.teamName}</td>
                <td className="table-numbers">{team.played}</td>
                <td className="table-numbers">{team.wins}</td>
                <td className="table-numbers">{team.draws}</td>
                <td className="table-numbers">{team.losses}</td>
                <td className="table-numbers">{team.goalsFor}</td>
                <td className="table-numbers">{team.goalsAgainst}</td>
                <td className={`${"table-numbers"} ${getGDClass(team.goalDifference)}`}>{team.goalDifference}</td>
                <td className="table-numbers">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}
