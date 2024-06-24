import React, { useEffect, useState } from "react";
import "../App.css";
import "./Stats.css"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export default function Stats() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const fetchPlayers = async () => {
      const teamCollection = await getDocs(collection(db, "teams"))
      const teamsData = teamCollection.docs.map(async teamDoc => {
        const teamData = teamDoc.data()
        const rosterCollection = await getDocs(collection(teamDoc.ref,"roster"))
        const rosterData = rosterCollection.docs.map(playerDoc => ({
          id: playerDoc.id,
          ...playerDoc.data()
        }))
        return {
          id: teamDoc.id,
          roster: rosterData,
          ...teamData
        }
      })
      const teamsWithRosters = await Promise.all(teamsData)
      setTeams(teamsWithRosters)
    }
    fetchPlayers()
  },[])

  return (
    <div className="stats">
      <div className="stats-container">
        <h1 className="stats-header">STATS</h1>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Yellow</th>
              <th>Red</th>
            </tr>
          </thead>
          <tbody>
            {teams.map( (team) => (
              <>
                {team.roster.map((player) => (
              <tr key={team.id}>
                <td>({team.abbr}) {player.id}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.yellow}</td>
                <td>{player.red}</td>
              </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <ul>
      </ul>
    </div>
  )
}
