import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useAddMatch } from "../hooks/useAddMatch";
import { useAddTeam } from "../hooks/useAddTeam";
import { useGetTeams } from "../hooks/useGetTeams";
import ProcessResult from "../hooks/useProcessResult";
import "../App.css";
import "./AddMatch.css"


export default function AddMatch() {
  const {addMatch} = useAddMatch()
  const {addTeam} = useAddTeam()
  // const {teams} = useGetTeams()
  // changing the above line to implement fetchData after a submit
  const [teams, setTeams] = useState([])

  const [homeTeam, setHomeTeam] = useState("")
  const [homeGoals, setHomeGoals] = useState(undefined)
  const [awayTeam, setAwayTeam] = useState("")
  const [awayGoals, setAwayGoals] = useState(undefined)

  useEffect(() => {
    const fetchTeams = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const teamsData = await useGetTeams()
      setTeams(teamsData)
    }
    fetchTeams()
  },[])


  const onSubmit = (e) => {
    e.preventDefault()
    addMatch({
      homeTeam,
      homeGoals,
      awayTeam,
      awayGoals
    })

    let teamFound = false
    teams.forEach((team) => {
      const teamName = team.teamName
      if (homeTeam === teamName) {
        teamFound = true
      }
    })
    if (!teamFound) {
      const teamName = homeTeam
      console.log("Added", teamName)
      addTeam({teamName})
    }

    teamFound = false
    teams.forEach((team) => {
      const teamName = team.teamName
      if (awayTeam === teamName) {
        teamFound = true
      }
    })
    if (!teamFound) {
      const teamName = awayTeam
      console.log("Added", teamName)
      addTeam({teamName})
    }
    
    ProcessResult(
      homeTeam,
      homeGoals,
      awayTeam,
      awayGoals)

    setHomeTeam("")
    setHomeGoals("")
    setAwayTeam("")
    setAwayGoals("")

  }

  const {isAuth} = useGetUserInfo()

  if (!isAuth) {
    return <Navigate to="/sign-in"/>
  }

  return (
    <div className="add-match">
      <div className="container">
        <h1>ADD MATCH</h1>
        <form className="add-match-data" onSubmit={onSubmit}>
          <label>Home Team</label>
          <input
            type="text"
            placeholder="Home Team"
            value={homeTeam}
            required
            onChange={(e) => setHomeTeam(e.target.value)}
          />
          <label>Home Goals</label>
          <input
            type="number"
            placeholder="Home Goals"
            value={homeGoals}
            required
            onChange={(e) => setHomeGoals(e.target.valueAsNumber)} 
          />
          <label>Away Team</label>
          <input
            type="text"
            placeholder="Away Team"
            value={awayTeam}
            required
            onChange={(e) => setAwayTeam(e.target.value)}
          />
          <label>Away Goals</label>
          <input
            type="number"
            placeholder="Away Goals"
            value={awayGoals}
            required
            onChange={(e) => setAwayGoals(e.target.valueAsNumber)}
          />

          <button type="submit">Add Match Data</button>
        </form>
      </div>
    </div>
  );
}
