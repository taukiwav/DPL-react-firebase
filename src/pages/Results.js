import React from "react";
import "../App.css"
import "./Results.css"
import { useGetMatches } from "../hooks/useGetMatches";

export default function Results() {

  const {matches} = useGetMatches()

  return (
    <div className="results">
      <div className="matches">
        <h3>RESULTS</h3>
          <ul>
            {matches.map((match) => {
              const {homeTeam, homeGoals, awayTeam, awayGoals} = match

              return (
                <div className="match-item">
                  <li className="home-team">
                    {homeTeam}
                  </li>
                  <li className="score">
                    {homeGoals} - {awayGoals}
                  </li>
                  <li className="away-team">
                    {awayTeam}
                  </li>
                </div>
              );
            })}
          </ul>

      </div>
    </div>
  );
}
