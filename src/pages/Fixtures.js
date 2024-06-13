import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import '../App.css'
import './Fixtures.css'

export default function Fixtures() {
  const [groupedFixtures, setGroupedFixtures] = useState({});

  useEffect(() => {
    const fetchFixtures = async () => {
      const snapshot = await getDocs(
        query(collection(db, "fixtures"), orderBy("date", "asc"))
      );
      const fixturesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: new Date(doc.data().date),
      }));

      const grouped = fixturesData.reduce((acc, fixture) => {
        const dateKey = fixture.date.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(fixture);
        return acc;
      }, {});
      setGroupedFixtures(grouped);
    };
    fetchFixtures();
  }, []);

  // Adding Team Logos

  const [teamLogos, setTeamLogos] = useState({});

  useEffect(() => {
    const fetchTeamLogos = async () => {
      const logosSnapshot = await getDocs(collection(db, "teams"));
      const logos = {};
      logosSnapshot.forEach((doc) => {
        logos[doc.id] = doc.data().badge;
      });
      setTeamLogos(logos);
    };
    fetchTeamLogos();
  }, []);

  return (
    <div className="fixtures">
      <div className="fixtures-container">
        <h1>FIXTURES</h1>
        {Object.keys(groupedFixtures).map((date) => (
          <div key={date}>
            <h2>{date}</h2>
            <table className="fixtures-contents">
              <tbody>
                {groupedFixtures[date].map((fixture) => (
                  <tr key={fixture.id}>
                    <div className="fixtures-row">
                      <div className="team-one">
                        {fixture.teamOne}
                        <img
                          src={teamLogos[fixture.teamOne]}
                          alt=""
                          className="fixtures-club-img"
                        />
                      </div>
                      <div className="vs">vs</div>
                      <div className="team-two">
                        <img
                          src={teamLogos[fixture.teamTwo]}
                          alt=""
                          className="fixtures-club-img"
                        />
                        {fixture.teamTwo}
                      </div>
                    </div>
                    {/* <td className="team-one">{fixture.teamOne}<img src={teamLogos[fixture.teamOne]} alt='' className='fixtures-club-img'/></td>
                    <td className="vs">vs</td>
                    <td className="team-two"><img src={teamLogos[fixture.teamTwo]} alt='' className='fixtures-club-img'/>{fixture.teamTwo}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}