import { useAddTeam } from "./useAddTeam";
import { useGetMatches } from "./OLDuseGetMatches";
import { useGetTeams } from "./OLDuseGetTeams";
// import ProcessResult from "./useProcessResult";
// READ CODE NEAR BOTTOM

export default function CheckAllTeams() {
    const {addTeam} = useAddTeam()
    const {matches} = useGetMatches()
    const {teams} = useGetTeams()

    //check if teams from matches are in data
    matches.forEach((match) => {
        const {homeTeam, awayTeam,} = match
        // console.log(homeTeam, homeGoals,"-", awayGoals, awayTeam)

        let teamFound = false
        teams.forEach((team) => {
            const teamName = team.teamName
            if (homeTeam === teamName) {
                teamFound = true
            }
        })
        // if not found add homeTeam to data
        if (!teamFound) {
            const teamName = homeTeam
            addTeam({teamName})
            console.log("Team Added")
        }
        teamFound = false 
        teams.forEach((team) => {
            const teamName = team.teamName
            if (awayTeam === teamName) {
                teamFound = true
            }
        })
        // if not found add awayTeam to data
        if (!teamFound) {
            const teamName = awayTeam
            addTeam({teamName})
            console.log("Team Added")
        }
    })


    // only include section below to calculate if ALL matches are in database
    // useProcessResult() should be used on results.js when a match is submitted


    // matches.forEach((match) => {
    //     const {homeTeam, homeGoals, awayTeam, awayGoals} = match
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     ProcessResult(homeTeam,homeGoals,awayTeam,awayGoals)
    //     console.log("processed match")
    // })
}