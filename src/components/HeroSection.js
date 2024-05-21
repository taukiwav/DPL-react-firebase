import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'
import myVideo from "../assets/video-3.mp4" //moved video inside src in new folder

function HeroSection() {
  return (
    <div className="hero-container">
      <video src={myVideo} autoPlay playsInline loop muted />
      {/* added playsInline to avoid triggering natvie video player on iphone */}
      <h1>MORE THAN A GAME</h1>
      <p>This is the League of Champions</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          linkTo="/table"
        >
          LEAGUE TABLE
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          WATCH NOW <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection