import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAddFixture } from "../hooks/useAddFixture";
import { useAddMatch } from "../hooks/useAddMatch";
import { useAddTeam } from "../hooks/useAddTeam";
import { useGetTeams } from "../hooks/useGetTeams";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import ProcessResult from "../hooks/useProcessResult";
import ProcessPlayerStats from "../hooks/useProcessPlayerStat";
import AutoComplete from "../components/AutoComplete";
import { useGetTeamNames } from "../hooks/useGetTeamNames";
import { useGetPlayerNames } from "../hooks/useGetPlayerNames";
import "../App.css";
import "./AddMatch.css";
import "./AddFixture.css";
import "../components/Button.css";

export default function AddMatch() {
  const { addMatch } = useAddMatch();
  const { addTeam } = useAddTeam();

  const [teams, setTeams] = useState([]);

  const [teamNames, setTeamNames] = useState([])
  const [playerNames, setPlayerNames] = useState({})

  const [homeTeam, setHomeTeam] = useState("");
  const [homeGoals, setHomeGoals] = useState(undefined);
  const [awayTeam, setAwayTeam] = useState("");
  const [awayGoals, setAwayGoals] = useState(undefined);

  useEffect(() => {
    const fetchTeams = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const teamsData = await useGetTeams();
      setTeams(teamsData);
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    const fetchTeamNames = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const teamsNameData = await useGetTeamNames()
      setTeamNames(teamsNameData)
    }
    fetchTeamNames()
  }, [])

  useEffect(() => {
    const fetchPlayerNames = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const playerNameData = await useGetPlayerNames()
      setPlayerNames(playerNameData)
    }
    fetchPlayerNames()

    
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    addMatch({
      homeTeam,
      homeGoals,
      awayTeam,
      awayGoals,
      homePlayerStats,
      awayPlayerStats,
    });

    let teamFound = false;
    teams.forEach((team) => {
      const teamName = team.teamName;
      if (homeTeam === teamName) {
        teamFound = true;
      }
    });
    if (!teamFound) {
      const teamName = homeTeam;
      console.log("Added", teamName);
      addTeam({ teamName });
    }

    teamFound = false;
    teams.forEach((team) => {
      const teamName = team.teamName;
      if (awayTeam === teamName) {
        teamFound = true;
      }
    });
    if (!teamFound) {
      const teamName = awayTeam;
      console.log("Added", teamName);
      addTeam({ teamName });
    }

    ProcessResult(homeTeam, homeGoals, awayTeam, awayGoals);

    ProcessPlayerStats(homeTeam, awayTeam, homePlayerStats, awayPlayerStats);

    setHomeTeam("");
    setHomeGoals("");
    setAwayTeam("");
    setAwayGoals("");
    setHomePlayerStats([{ name: "", goals: "", assists: "", redCard: "No" }]);
    setAwayPlayerStats([{ name: "", goals: "", assists: "", redCard: "No" }]);
  };

  // ############ PLAYER STATS ###########

  const [homePlayerStats, setHomePlayerStats] = useState([
    { name: "", goals: undefined, assists: undefined, redCard: "No" },
  ]);

  const handleHomePlayerStatChange = (index, field, value) => {
    const updatedHomePlayerStats = [...homePlayerStats];
    updatedHomePlayerStats[index][field] = value;
    setHomePlayerStats(updatedHomePlayerStats);
  };

  const addHomePlayerStat = () => {
    setHomePlayerStats([
      ...homePlayerStats,
      { name: "", goals: undefined, assists: undefined, redCard: "No" },
    ]);
  };

  const removeHomePlayerStat = () => {
    if (homePlayerStats.length > 0) {
      setHomePlayerStats(homePlayerStats.slice(0,-1))
    }
  }

  // Away Player stat
  const [awayPlayerStats, setAwayPlayerStats] = useState([
    { name: "", goals: undefined, assists: undefined, redCard: "No" },
  ]);

  const handleAwayPlayerStatChange = (index, field, value) => {
    const updatedAwayPlayerStats = [...awayPlayerStats];
    updatedAwayPlayerStats[index][field] = value;
    setAwayPlayerStats(updatedAwayPlayerStats);
  };

  const addAwayPlayerStat = () => {
    setAwayPlayerStats([
      ...awayPlayerStats,
      { name: "", goals: undefined, assists: undefined, redCard: "No" },
    ]);
  };

  const removeAwayPlayerStat = () => {
    if (awayPlayerStats.length > 0) {
      setAwayPlayerStats(awayPlayerStats.slice(0,-1))
    }
  }

  // #####################################

  // ############ FIXTURES ###############

  const { addFixture } = useAddFixture();

  const [teamOne, setTeamOne] = useState("");
  const [teamTwo, setTeamTwo] = useState("");
  const [date, setDate] = useState("");

  const onFixtureSubmit = (e) => {
    e.preventDefault();
    addFixture({
      teamOne,
      teamTwo,
      date,
    });

    setTeamOne("");
    setTeamTwo("");
    setDate("");
  }

  // #####################################

  const { isAuth } = useGetUserInfo();

  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="add-match">
      <div className="container">
        <h1>ADD MATCH</h1>
        <h3>Add Result Here</h3>
        <form id="match-form" className="add-match-form" onSubmit={onSubmit}>
          <div className="add-match-data-container">
            <div className="add-match-data">
              <div className="match-input-sections">
                <label className="left-label">Home Team</label>
                <AutoComplete options={teamNames} value={homeTeam} setValue={setHomeTeam} text={"Type Team Here"} inputClass={"left-label"} required={true}/>
              </div>
              <div className="match-input-sections">
                <label className="right-label">Goals</label>
                <input
                  className="right-label"
                  type="number"
                  placeholder="# Of Goals"
                  value={homeGoals}
                  required
                  onChange={(e) => setHomeGoals(e.target.valueAsNumber)}
                />
              </div>
            </div>
            <div className="add-match-data">
              <div className="match-input-sections">
                <label className="left-label">Away Team</label>
                <AutoComplete options={teamNames} value={awayTeam} setValue={setAwayTeam} text={"Type Team Here"} inputClass={"left-label"} required={true}/>
              </div>
              <div className="match-input-sections">
                <label className="right-label">Goals</label>
                <input
                  className="right-label"
                  type="number"
                  placeholder="# Of Goals"
                  value={awayGoals}
                  required
                  onChange={(e) => setAwayGoals(e.target.valueAsNumber)}
                />
              </div>
            </div>
          </div>
          {/* ################## PLAYER STAT ADDITION ################## */}
          <div className="add-stat-data-container">
            <div className="add-stat-data-sub">
              <h3>Add Home Stats</h3>
              <div className="add-stat-labels">
                <label className="left-label">Player Name</label>
                <label>Goals</label>
                <label>Assists</label>
                <label className="right-label">Red Card</label>
              </div>
              {homePlayerStats.map((player, index) => (
                <div className="add-stat-data">
                  <div className="player-input-sections">
                    <AutoComplete options={playerNames[homeTeam]} value={player.name} setValue={(value) => handleHomePlayerStatChange(index, "name", value)} text="Type Name Here" inputClass={"left-label"} required={true}/>
                  </div>
                  <div className="player-input-sections">
                    <input
                      type="number"
                      placeholder="# Here"
                      value={player.goals}
                      required
                      onChange={(e) =>
                        handleHomePlayerStatChange(
                          index,
                          "goals",
                          e.target.valueAsNumber
                        )
                      }
                    />
                  </div>
                  <div className="player-input-sections">
                    <input
                      type="number"
                      placeholder="# Here"
                      value={player.assists}
                      required
                      onChange={(e) =>
                        handleHomePlayerStatChange(
                          index,
                          "assists",
                          e.target.valueAsNumber
                        )
                      }
                    />
                  </div>
                  <div className="player-input-sections">
                    <select
                      className="right-label"
                      value={player.redCard}
                      onChange={(e) =>
                        handleHomePlayerStatChange(
                          index,
                          "redCard",
                          e.target.value
                        )
                      }
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="add-stat-btn-container">
                <button type="button" onClick={addHomePlayerStat} className={`${"btn--medium"} ${"btn--outline"}`}>
                  Add Player +
                </button>
                <button type="button" onClick={removeHomePlayerStat} className={`${"btn--medium"} ${"btn--outline"}`}>
                  Remove Player -
                </button>

              </div>
            </div>
            <div className="add-stat-data-sub">
              <h3>Add Away Stats</h3>
              <div className="add-stat-labels">
                <label className="left-label">Player Name</label>
                <label>Goals</label>
                <label>Assists</label>
                <label className="right-label">Red Card</label>
              </div>
              {awayPlayerStats.map((player, index) => (
                <div className="add-stat-data">
                  <div className="player-input-sections">
                    <AutoComplete options={playerNames[awayTeam]} value={player.name} setValue={(value) => handleAwayPlayerStatChange(index, "name", value)} text="Type Name Here" inputClass={"left-label"} required={true}/>
                  </div>
                  <div className="player-input-sections">
                    <input
                      type="number"
                      placeholder="# Here"
                      value={player.goals}
                      required
                      onChange={(e) =>
                        handleAwayPlayerStatChange(
                          index,
                          "goals",
                          e.target.valueAsNumber
                        )
                      }
                    />
                  </div>
                  <div className="player-input-sections">
                    <input
                      type="number"
                      placeholder="# Here"
                      value={player.assists}
                      required
                      onChange={(e) =>
                        handleAwayPlayerStatChange(
                          index,
                          "assists",
                          e.target.valueAsNumber
                        )
                      }
                    />
                  </div>
                  <div className="player-input-sections">
                    <select
                      className="right-label"
                      value={player.redCard}
                      onChange={(e) =>
                        handleAwayPlayerStatChange(
                          index,
                          "redCard",
                          e.target.value
                        )
                      }
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
              ))}
              <div className="add-stat-btn-container">
                <button type="button" onClick={addAwayPlayerStat} className={`${"btn--medium"} ${"btn--outline"}`}>
                  Add Player +
                </button>
                <button type="button" onClick={removeAwayPlayerStat} className={`${"btn--medium"} ${"btn--outline"}`}>
                  Remove Player -
                </button>
              </div>
            </div>
          </div>
          {/* ########################################################## */}
        </form>
        <button
          type="submit"
          form="match-form"
          className={`${"btn--medium"} ${"btn--outline"}`}
        >
          Submit Match Data
        </button>
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
        <button
          type="submit"
          form="fixture-form"
          className={`${"btn--medium"} ${"btn--outline"}`}
        >
          Add Fixture
        </button>
      </div>
    </div>
  );
}
