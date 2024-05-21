import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { useAddMatch } from "../hooks/useAddMatch";
import "../App.css";

export default function AddMatch() {
  const {addMatch} = useAddMatch()

  const [homeTeam, setHomeTeam] = useState("")
  const [homeGoals, setHomeGoals] = useState(undefined)
  const [awayTeam, setAwayTeam] = useState("")
  const [awayGoals, setAwayGoals] = useState(undefined)

  const onSubmit = (e) => {
    e.preventDefault()
    addMatch({
      homeTeam,
      homeGoals,
      awayTeam,
      awayGoals
    })

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
