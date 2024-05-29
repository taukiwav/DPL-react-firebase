import React, { useEffect, useState } from "react";
import "../App.css";
import "./Table.css"
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../config/firebase-config";

export default function Table() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(query(collection(db, "teams"),orderBy("points",'desc')))
      const teamsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTeams(teamsData)
    }
    fetchData()
  },[])

  return (
    <div className="table">
      <div className="table-container">
        <h1>TABLE</h1>
        <table className="table-contents">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Club</th>
              <th className="table-numbers">Played</th>
              <th className="table-numbers">Won</th>
              <th className="table-numbers">Drawn</th>
              <th className="table-numbers">Lost</th>
              <th className="table-numbers">GF</th>
              <th className="table-numbers">GA</th>
              <th className="table-numbers">GD</th>
              <th className="table-numbers">Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team,index) => (
              <tr key={team.id}>
                <td>{index + 1}</td>
                <td>{team.teamName}</td>
                <td className="table-numbers">{team.played}</td>
                <td className="table-numbers">{team.wins}</td>
                <td className="table-numbers">{team.draws}</td>
                <td className="table-numbers">{team.losses}</td>
                <td className="table-numbers">{team.goalsFor}</td>
                <td className="table-numbers">{team.goalsAgainst}</td>
                <td className="table-numbers">{team.goalDifference}</td>
                <td className="table-numbers">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
}
