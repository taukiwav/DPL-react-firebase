import React from "react";
import { Link } from "react-router-dom";
import zgBadge from "../assets/images/clubs/zg.png"
import emBadge from "../assets/images/clubs/emperors.png"
import intBadge from "../assets/images/clubs/inter.png"
import "../App.css";
import "./Clubs.css"

export default function Clubs() {

  return (
    <>
      <div className="clubs">
        <div className="clubs-container">
          <h1>CLUBS</h1>
          <ul className="clubs-list">
            <li className="clubs-item">
              <Link to="/clubs" className="clubs-links">
                <img src={zgBadge} alt="Zero Gravity" className="clubs-zg" />
                Zero Gravity
              </Link>
            </li>
            <li className="clubs-item">
              <Link to="/clubs" className="clubs-links">
                <img src={emBadge} alt="Emperors Alliance" className="clubs-emp" />
                Emperors Alliance
              </Link>
            </li>
            <li className="clubs-item">
              <Link to="/clubs" className="clubs-links">
                <img src={intBadge} alt="Inter Marine" className="clubs-int" />
                Inter Marine
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
