import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import "../App.css";
import "./Stats.css"

export default function Stats() {
  const [players, setPlayers] = useState([])
  const [sortCriteria, setSortCriteria] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    const fetchPlayers = async () => {
      const teamCollection = await getDocs(collection(db, "teams"))
      const teamsData =  await Promise.all (
        teamCollection.docs.map(async (teamDoc) => {
        const teamData = teamDoc.data()
        const rosterCollection = await getDocs(collection(teamDoc.ref,"roster"))
        const rosterData = rosterCollection.docs.map((playerDoc) => ({
          id: playerDoc.id,
          ...playerDoc.data(),
          teamBadge: teamData.badge
        }))
        return rosterData
      })
    )

    const allPlayers = teamsData.flat()
    setPlayers(allPlayers)
    }
    fetchPlayers()
  },[])

  const handleSort = (criteria) => {
    const order = sortCriteria === criteria && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortCriteria(criteria)
    setSortOrder(order)

    const sortedPlayers = [...players].sort((a,b) => {
      if (order === 'asc') {
        return a[criteria] > b[criteria] ? 1 : -1
      } else {
        return a[criteria] < b[criteria] ? 1 : -1
      }
    })
    setPlayers(sortedPlayers)
  }

  const getHeaderClass = (criteria) => {
    return sortCriteria === criteria ? "stats-active-header" : "stats-inactive-header"
  }

  const redCard = "https://firebasestorage.googleapis.com/v0/b/thedpl-187ff.appspot.com/o/red36x48.png?alt=media&token=e6aa863b-fe80-4fc2-9508-872429aef84e"
  const yellowCard ="https://firebasestorage.googleapis.com/v0/b/thedpl-187ff.appspot.com/o/yellow36x48.png?alt=media&token=bafb6af1-9e43-4461-a83a-c44f023c1afd"

  return (
    <div className="stats">
      <div className="stats-container">
        <h1 className="stats-header">STATS</h1>
        <table className="stats-table">
          <thead>
            <tr>
              <th className={`${"stats-playername"} ${"stats-inactive-header"}`}>Name</th>
              <th onClick={() => handleSort('goals')} className={`${"stats-numbers"} ${getHeaderClass('goals')}`}>Goals{sortCriteria === 'goals' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('assists')} className={`${"stats-numbers"} ${getHeaderClass('assists')}`}>Assists{sortCriteria === 'assists'&& (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('yellow')} className={`${"stats-numbers"} ${getHeaderClass('yellow')}`}><img src={yellowCard} alt="" className="stats-card-img"/>{sortCriteria === 'yellow' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('red')} className={`${"stats-numbers"} ${getHeaderClass('red')}`}><img src={redCard} alt="" className="stats-card-img"/>{sortCriteria === 'red' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
            </tr>
          </thead>
          <tbody>
            {players.map( (player) => (
              <tr>
                {/* had to get rid of key= because sorting confused renders duplicating players with same name */}
                <td className="stats-playername"><img src={player.teamBadge} alt="" className="stats-club-img"/> {player.id}</td>
                <td className="stats-numbers">{player.goals}</td>
                <td className="stats-numbers">{player.assists}</td>
                <td className="stats-numbers">{player.yellow}</td>
                <td className="stats-numbers">{player.red}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul>
      </ul>
    </div>
  )
}
