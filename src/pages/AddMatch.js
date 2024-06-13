import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAddFixture } from "../hooks/useAddFixture";
import { useAddMatch } from "../hooks/useAddMatch";
import { useAddTeam } from "../hooks/useAddTeam";
import { useGetTeams } from "../hooks/useGetTeams";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import ProcessResult from "../hooks/useProcessResult";
import "../App.css";
import "./AddMatch.css";
import "./AddFixture.css";
import "../components/Button.css";

export default function AddMatch() {
  const {addMatch} = useAddMatch()
  const {addTeam} = useAddTeam()

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
  
  // ############ FIXTURES ###############

  const {addFixture} = useAddFixture()

  const [teamOne, setTeamOne] = useState("")
  const [teamTwo, setTeamTwo] = useState("")
  const [date, setDate] = useState("")

  const onFixtureSubmit = (e) => {
    e.preventDefault()
    addFixture({
      teamOne,
      teamTwo,
      date
    })

    setTeamOne("")
    setTeamTwo("")
    setDate("")

  }

  // #####################################

  const {isAuth} = useGetUserInfo()

  if (!isAuth) {
    return <Navigate to="/sign-in"/>
  }

  return (
    <div className="add-match">
      <div className="container">
        <h1>ADD MATCH</h1>
        <h3>Submit Results Here</h3>
        <form id="match-form" className="add-match-data" onSubmit={onSubmit}>
          <div className="match-input-sections">
            <label>Home Team</label>
            <input
              type="text"
              placeholder="Type Team Name Here"
              value={homeTeam}
              required
              onChange={(e) => setHomeTeam(e.target.value)}
            />
          </div>
          <div className="match-input-sections">
            <label>Home Goals</label>
            <input
              type="number"
              placeholder="# Of Goals Here"
              value={homeGoals}
              required
              onChange={(e) => setHomeGoals(e.target.valueAsNumber)}
            />
          </div>
          <div className="match-input-sections">
            <label>Away Team</label>
            <input
              type="text"
              placeholder="Type Team Name Here"
              value={awayTeam}
              required
              onChange={(e) => setAwayTeam(e.target.value)}
            />
          </div>
          <div className="match-input-sections">
            <label>Away Goals</label>
            <input
              type="number"
              placeholder="# Of Goals Here"
              value={awayGoals}
              required
              onChange={(e) => setAwayGoals(e.target.valueAsNumber)}
            />
          </div>
        </form>
        <button type="submit" form="match-form" className={`${"btn--medium"} ${"btn--outline"}`}>Add Match Data </button>
      </div>
      {/* ############## Fixture Section ####################### */}
      <div className="container">
        <h1>ADD FIXTURE</h1>
        <h3>Add Fixtures To Schedule</h3>
        <form
          id="fixture-form"
          className="add-fixture-data"
          onSubmit={onFixtureSubmit}
        >
          <div className="fixture-input-sections">
            <label>Home Team</label>
            <input
              type="text"
              placeholder="Type Team Name Here"
              value={teamOne}
              required
              onChange={(e) => setTeamOne(e.target.value)}
            />
          </div>
          <div className="fixture-input-sections">
            <label>Away Team</label>
            <input
              type="text"
              placeholder="Type Team Name Here"
              value={teamTwo}
              required
              onChange={(e) => setTeamTwo(e.target.value)}
            />
          </div>
          <div className="fixture-input-sections">
            <label>Date</label>
            <input
              type="datetime-local"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </form>
        <button type="submit" form="fixture-form" className={`${"btn--medium"} ${"btn--outline"}`}>Add Fixture</button>
      </div>
    </div>
  );
}
